// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, // change to your backend URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add token automatically
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access"); // or sessionStorage

//     if (token) {
//       const {exp} = jwtDecode(token)
//       const isExpired = Date.now() >= exp*1000;
//       if (isExpired){
//         localStorage.removeItem("access")
//         localStorage.removeItem("refresh")
//         localStorage.removeItem("role")
//         // window.location.reload('/')
        
//       }
      
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST: attach access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE: refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");

        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}api/token/refresh/`,
          { refresh }
        );

        localStorage.setItem("access", res.data.access);

        originalRequest.headers.Authorization =
          `Bearer ${res.data.access}`;

        return api(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
