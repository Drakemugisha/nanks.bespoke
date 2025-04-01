import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});
const pricateapi = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

pricateapi.interceptors.request.use(
  (config) => {
    console.log('request:', config)
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

pricateapi.interceptors.response.use(
  response => response,
  error =>{
    if(error.response.status === 401){
      console.log('Unauthorizired-redirecting to login...');
      localStorage.removeItem(ACCESS_TOKEN);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
)

export default api;
