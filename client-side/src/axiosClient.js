import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Accept = "application/json";
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response.status == 200 || response.status == 201) {
        return response;
    }
});
export default axiosClient;
