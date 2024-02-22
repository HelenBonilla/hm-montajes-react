import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaUser, FaLock } from "react-icons/fa";
import "./LoginForm.css";
import axios from "../../api/axios"

const LoginForm = () => {
    const { setToken } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('api/token/', {
            'username': username,
            'password': password,
        })
        .then(response => {
            const { access, refresh } = response.data
            setToken(access)
        })
    }

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <div className="content-img">
                    <div className="logo-img"></div>
                </div>

                <div className="input-box">
                    <input type="text" name="username" value={username} onChange={handleInputChange} placeholder='Usuario' required />
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" name="password" value={password} onChange={handleInputChange} placeholder='Contraseña' required />
                    <FaLock className="icon" />
                </div>

                <div className="remember-forgot">
                    <label><input type="checkbox"/>Recuerdame</label>
                    <a href="#">Olvidaste la contraseña?</a>
                </div>

                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default LoginForm;
