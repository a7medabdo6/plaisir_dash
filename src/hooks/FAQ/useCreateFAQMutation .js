import { useMutation } from '@tanstack/react-query';
import { createFAQ } from 'src/api/FAQ/FAQ';

const useCreateFAQMutation = () => {
  return useMutation({
    mutationFn: createFAQ,
    onSuccess: (data) => {
      console.log('FAQ created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating FAQ:', error);
    },
  });
};

export default useCreateFAQMutation;
