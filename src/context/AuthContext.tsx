import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Role = 'guest' | 'user' | 'admin';

interface AuthContextType {
    role: Role;
    login: (role: Role) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState<Role>('guest');

    const login = (role: Role) => {
        setRole(role);
    };

    const logout = () => {
        setRole('guest');
    };

    return (
        <AuthContext.Provider value={{ role, login, logout }}>
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
