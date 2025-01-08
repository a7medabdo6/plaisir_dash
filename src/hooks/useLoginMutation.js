// src/hooks/useLoginMutation.js
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/authApi';

const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('Response:', data);
    },
    onError: (error) => {
      console.error('Error:', error.response.data);
    },
  });
};

export default useLoginMutation;



