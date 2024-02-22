import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const PublicRoutes = ({ children }) => {
    const { auth } = useAuth();
    return (
        auth?.accessToken
        ? <Navigate to="/"/>
        : children
    );
}