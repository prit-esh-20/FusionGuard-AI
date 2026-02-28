import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Role = 'guest' | 'user' | 'admin';

interface AuthContextType {
    role: Role;
    isAuthenticated: boolean;
    login: (role: Role) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Attempt to restore role from localStorage, default to 'guest'
    const [role, setRole] = useState<Role>(() => {
        const savedRole = localStorage.getItem('fusionguard_role');
        return (savedRole as Role) || 'guest';
    });

    const isAuthenticated = role !== 'guest';

    const login = (newRole: Role) => {
        setRole(newRole);
        localStorage.setItem('fusionguard_role', newRole);
    };

    const logout = () => {
        setRole('guest');
        localStorage.removeItem('fusionguard_role');
    };

    return (
        <AuthContext.Provider value={{ role, isAuthenticated, login, logout }}>
            {children}
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
