import axios from "axios";

const instance = axios.create({
  baseURL: "https://sore-tan-elk-wear.cyclic.app/",
});

instance.interceptors.request.use((config): any => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
