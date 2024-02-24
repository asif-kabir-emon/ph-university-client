import { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    TUser,
    logout,
    useCurrentToken,
} from '../../redux/feature/auth/authSlice';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../../utils/verifyToken';

type TProtectedRoute = {
    children: ReactNode;
    role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
    const token = useAppSelector(useCurrentToken);
    let user;

    if (token) {
        user = verifyToken(token);
    }

    const dispatch = useAppDispatch();

    if (role !== undefined && (user as TUser)?.role !== role) {
        dispatch(logout());
        return <Navigate to="/" replace={true} />;
    }

    if (token === null || !token) {
        return <Navigate to="/login" replace={true} />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
