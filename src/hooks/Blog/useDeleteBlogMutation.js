import { useMutation } from '@tanstack/react-query';
import { deleteBlog } from 'src/api/Blog/Blog';

const useDeleteBlogMutation = () => {
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: (data, BlogId) => {
      console.log(`Blog with ID ${BlogId} deleted successfully`, data);
      // Optional: You can invalidate queries or refetch categories here
    },
    onError: (error) => {
      console.error('Error deleting Blog:', error);
    },
  });
};

export default useDeleteBlogMutation;
