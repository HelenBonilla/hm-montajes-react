import axios from 'axios';
import { API_URL } from '../components/utils/constants';

const api = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
