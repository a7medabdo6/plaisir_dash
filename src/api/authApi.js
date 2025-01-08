import axiosInstance from './axiosInstance';

export const loginUser = async (loginData) => {
  const response = await axiosInstance.post('/v1/auth/email/login', loginData);
  return response.data;
};

