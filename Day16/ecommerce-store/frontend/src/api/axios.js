import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",  // 👈 ध्यान दो यहाँ /api है
});

export default API;
