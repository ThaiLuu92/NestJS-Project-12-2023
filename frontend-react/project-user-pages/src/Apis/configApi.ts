import axios, { AxiosStatic } from "axios";

const REACT_APP_API = process.env.REACT_APP_API;

const axiosInttance = axios.create({
    baseURL: REACT_APP_API + "/api/v1/", timeout: 3000
})
axiosInttance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("X-API-Key");
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);



export default axiosInttance;

