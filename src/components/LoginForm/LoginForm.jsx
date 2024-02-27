import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "../../api/axios"
import "./LoginForm.css";

const LoginForm = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const usernameRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    useEffect(() => {
      setErrorMsg('');
    }, [username, password])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('api/token/',
                {
                    'username': username,
                    'password': password,
                }
            );
            const accessToken = response?.data?.access;
            const refreshToken = response?.data?.refresh;
            setAuth({ accessToken, refreshToken });
            setUsername('');
            setPassword('');
            navigate(from, {replace: true});
        } catch (error) {
            if (!error?.response) {
                setErrorMsg('No hay respuesta del servidor');
            } else if (error.response?.status === 400) {
                setErrorMsg('Falta nombre de usuario o contraseña');
            } else if (error.response?.status === 401) {
                setErrorMsg('No autorizado');
            } else {
                setErrorMsg('Error de inicio de sesion');
            }
        }
    }

    return (
        <div className="login-bg">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="content-img">
                        <div className="logo-img"></div>
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="username"
                            ref={usernameRef}
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            placeholder='Usuario'
                            required
                        />
                        <FaUser className="icon"/>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder='Contraseña'
                            required
                        />
                        <FaLock className="icon" />
                    </div>

                    <p ref={errorRef} className={errorMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
                    <br></br>
                    <div className="remember-forgot">
                        <label><input type="checkbox"/>Recuerdame</label>
                        <a href="#">Olvidaste la contraseña?</a>
                    </div>

                    <button type="submit">Ingresar</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
