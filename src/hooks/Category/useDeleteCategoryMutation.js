import { useMutation } from '@tanstack/react-query';
import { deleteCategory } from 'src/api/Category/Category';

const useDeleteCategoryMutation = () => {
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data, categoryId) => {
      console.log(`Category with ID ${categoryId} deleted successfully`, data);
      // Optional: You can invalidate queries or refetch categories here
    },
    onError: (error) => {
      console.error('Error deleting category:', error);
    },
  });
};

export default useDeleteCategoryMutation;
