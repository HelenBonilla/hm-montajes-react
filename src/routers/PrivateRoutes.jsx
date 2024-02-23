import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const PrivateRoutes = ({ children }) => {
    const { auth } = useAuth();
    return (
        auth?.accessToken
        ? children
        : <Navigate to="/auth/login"/>
    );
}