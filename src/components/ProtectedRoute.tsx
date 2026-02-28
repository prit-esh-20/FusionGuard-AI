import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { role } = useAuth();
    const location = useLocation();

    if (!allowedRoles.includes(role)) {
        // If user is logged in but trying to access admin route, redirect to user dashboard
        if (role === 'user') {
            return <Navigate to="/user/dashboard" replace />;
        }
        // Otherwise redirect to login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
