import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://blogsy-skv1.onrender.com/api",
    withCredentials: true,
});

export default axiosInstance; 