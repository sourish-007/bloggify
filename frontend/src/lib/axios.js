import axios from 'axios';

const getBaseURL = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5000';
  }
  
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }
  
  return 'https://bloggify-z8j2.onrender.com';
};

const axiosInstance = axios.create({
  baseURL: getBaseURL()
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { axiosInstance };