import axios from "../api/axios";
import useAuth from "./useAuth";

export const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/api/token/refresh/', {
            withCredentials: true
        });
        setAuth(prev => {
            return { ...prev, accessToken: response.data.access}
        });
        return response.data.access;
    }

    return refresh;
}

export default useRefreshToken;