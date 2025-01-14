import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.plaissir.com/api',
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
