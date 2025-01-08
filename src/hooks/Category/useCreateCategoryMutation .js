import { useMutation } from '@tanstack/react-query';
import { createCategory } from 'src/api/Category/Category';

const useCreateCategoryMutation = () => {
  return useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      console.log('Category created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating category:', error);
    },
  });
};

export default useCreateCategoryMutation;
