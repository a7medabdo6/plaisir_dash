import { useMutation } from '@tanstack/react-query';
import { deleteBlogTag } from 'src/api/BlogsTags/BlogsTags';

const useDeleteBlogTagMutation = () => {
  return useMutation({
    mutationFn: deleteBlogTag,
    onSuccess: (data, BlogTagId) => {
      console.log(`BlogTag with ID ${BlogTagId} deleted successfully`, data);
      // Optional: You can invalidate queries or refetch categories here
    },
    onError: (error) => {
      console.error('Error deleting BlogTag:', error);
    },
  });
};

export default useDeleteBlogTagMutation;
