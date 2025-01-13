import { useMutation } from '@tanstack/react-query';
import { createUser } from 'src/api/Users/Users';

const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log('User created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating User:', error);
    },
  });
};

export default useCreateUserMutation;
