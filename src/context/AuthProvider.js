import { createContext, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useLocalStorage('auth', {})
    const navigate = useNavigate();

    const logout = () => {
        setAuth({});
        navigate("/auth/login", { replace: true });
    };

    useEffect(() => {
        const verifyToken = async (token) => {
            try {
                const response = await axios.post('/api/token/verify/', {
                    token: auth?.refreshToken
                })
            } catch (error) {
                // BAD REQUEST: either the token was empty or it was invalid
                logout()
            }
        }

        verifyToken()
    }, [])

    const contextValue = useMemo(
        () => {
            return {
                auth,
                setAuth,
                logout,
            }
        },
        [auth]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;