import axios from "axios";

const api = axios.create({
  baseURL: 'https://pcg-crud-c6a7b494e9a6.herokuapp.com/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;     
});

export default api;