import axios from "axios";

export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export function getToken() { return localStorage.getItem("token"); }
export function setToken(t) { if (!t) localStorage.removeItem("token"); else localStorage.setItem("token", t); }

const api = axios.create({ baseURL: API_BASE + "/api" });
api.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
