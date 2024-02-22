import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const PrivateRoutes = ({children}) => {
    const { token } = useAuth();
    return (!token)
        ? <Navigate to="/auth/login"/>
        : children
}