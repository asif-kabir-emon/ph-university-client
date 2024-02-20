import { ReactNode } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useCurrentToken } from '../../redux/feature/auth/authSlice';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = useAppSelector(useCurrentToken);
    console.log(token);
    if (token === null || !token) {
        return <Navigate to="/login" replace={true} />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;