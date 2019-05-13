import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('app.authToken');
  const newConfig = config;
  if (token) {
    newConfig.headers.common.Authorization = token;
  }
  return newConfig;
});

export default instance;
