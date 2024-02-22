import {
    createContext,
    useMemo,
    useState,
} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})

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