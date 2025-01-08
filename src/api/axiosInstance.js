import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://51.20.18.35:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // استدعاء التوكن من localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // إضافة التوكن إلى الهيدر
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
