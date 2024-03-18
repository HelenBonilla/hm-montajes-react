import useAuth from "../../hooks/useAuth";
import { MdLogout } from "react-icons/md";

export const LogoutButton = () => {
    const { setAuth, logout } = useAuth();

    return (
        <div className="LinkContainer">
            <a href="" className="Links" onClick={logout}>
                <div className="Linkicon"><MdLogout/></div>
                <span>Cerrar sesión</span>
            </a>
        </div>
    );
}