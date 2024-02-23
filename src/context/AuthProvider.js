import {
    createContext,
    useMemo,
    useEffect,
    useState,
} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')) ?? {})

    useEffect(() => {
        if (Object.keys(auth).length) {
            localStorage.setItem('auth', JSON.stringify(auth));
        } else {
            localStorage.removeItem('auth');
        }
    }, [auth])

    const contextValue = useMemo(
        () => {
            return {
                auth,
                setAuth,
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