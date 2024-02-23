import axios from "../api/axios";
import useAuth from "./useAuth";

export const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post('/api/token/refresh/',
            {
                'refresh': auth.refreshToken
            },
            {
                withCredentials: true
            }
        );
        setAuth(prev => {
            return { ...prev, accessToken: response.data.access}
        });
        return response.data.access;
    }

    return refresh;
}

export default useRefreshToken;