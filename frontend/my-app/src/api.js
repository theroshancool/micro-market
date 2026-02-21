import axios from "axios";

const API = axios.create({
    // baseURL: "http://localhost:3000",
       baseURL: "https://micro-market-nh0l.onrender.com",
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
});

export default API;
