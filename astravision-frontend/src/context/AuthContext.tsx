import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { verifyTokenApi, getStoredToken, logoutApi } from '../services/authApi';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

type Role = 'guest' | 'user' | 'admin';

interface AuthContextType {
    role: Role;
    isAuthenticated: boolean;
    isLoading: boolean;
    user: { email: string | null } | null;
    login: (role: Role, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState<Role>('guest');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<{ email: string | null } | null>(null);

    const isAuthenticated = role !== 'guest';

    useEffect(() => {
        const verifySession = async () => {
            const token = getStoredToken();

            if (!token) {
                setRole('guest');
                setIsLoading(false);
                return;
            }

            try {
                // Validate token with backend/local check via API service
                const result = await verifyTokenApi(token);

                if (result.valid && result.role) {
                    // Token is valid, restore session
                    setRole(result.role as Role);
                } else {
                    // Token is invalid or expired - clear everything
                    console.error("Session invalid:", result.message);
                    handleInvalidSession();
                }
            } catch (error) {
                console.error("Token verification failed:", error);
                handleInvalidSession();
            } finally {
                setIsLoading(false);
            }
        };

        const handleInvalidSession = () => {
            logoutApi(); // Uses the centralized logout logic from authApi
            setRole('guest');

            // Redirect to login if on a protected page
            const isPublicPage = ['/login', '/', '/about', '/architecture'].includes(window.location.pathname);
            if (!isPublicPage) {
                window.location.href = '/login';
            }
        };

        verifySession();

        const unsubscribeFirebase = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setRole('admin'); // Mapping Firebase users to admin for system access
                setUser({ email: firebaseUser.email });
                // Ensure localStorage is synced for page reloads
                localStorage.setItem('astravision_role', 'admin');
            } else {
                const legacyRole = localStorage.getItem('astravision_role') as Role;
                if (!legacyRole || legacyRole === 'guest') {
                    setRole('guest');
                    setUser(null);
                }
            }
        });

        return () => unsubscribeFirebase();
    }, []);

    const login = (newRole: Role, token: string) => {
        setRole(newRole);
        localStorage.setItem('astravision_role', newRole);
        localStorage.setItem('astravision_token', token);
    };

    const logout = async () => {
        try {
            await signOut(auth);
            logoutApi();
            setRole('guest');
            setUser(null);
            window.location.href = '/login';
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ role, isAuthenticated, isLoading, user, login, logout }}>
            {isLoading ? (
                <div className="min-h-screen flex items-center justify-center bg-dark-base text-neon-cyan">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="font-mono uppercase tracking-widest text-sm">Verifying Authentication Token...</p>
                    </div>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
