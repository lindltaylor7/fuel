import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/fuel/public/api",
})

export default axiosInstance;