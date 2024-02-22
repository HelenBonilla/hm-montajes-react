import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({children}) => {
    const { token } = useAuth();
    return (!token)
        ? <Navigate to="/auth/login"/>
        : children
}