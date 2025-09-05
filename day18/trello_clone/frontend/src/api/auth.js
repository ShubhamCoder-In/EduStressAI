import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', withCredentials: true });

export const register = (payload) => API.post('/api/auth/register', payload).then(r => r.data);
export const login = (payload) => API.post('/api/auth/login', payload).then(r => r.data);
export const refresh = () => API.post('/api/auth/refresh').then(r => r.data);
export default API;
