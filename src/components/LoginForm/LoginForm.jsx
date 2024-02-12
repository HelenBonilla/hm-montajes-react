import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa"; 

const LoginForm = () => {
    return (
        <div className="wrapper">
            <form action="">
                <div className="content-img">
                    <div className="logo-img">
                        </div>
                    </div>

                <div className="input-box">
                    <input type="text" placeholder='Usuario' required />
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Contraseña' required />
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
