import axios from "axios";
import { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "instagram-server-production.up.railway.app/",
});

instance.interceptors.request.use((config): InternalAxiosRequestConfig => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
