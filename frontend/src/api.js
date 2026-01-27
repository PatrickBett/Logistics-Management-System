import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access"); // or sessionStorage

    if (token) {
      const {exp} = jwtDecode(token)
      const isExpired = Date.now() >= exp*1000;
      if (isExpired){
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        localStorage.removeItem("role")
        window.location.reload('/')
        
      }
      
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

