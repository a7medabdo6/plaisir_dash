import { useMutation } from '@tanstack/react-query';
import { updateBlogTag } from 'src/api/BlogsTags/BlogsTags';

const useUpdateBlogTagMutation = () => {
  return useMutation({
    mutationFn: updateBlogTag,  // دالة التحديث
    onSuccess: (data) => {
      console.log('BlogTag updated successfully:', data);
    },
    onError: (error) => {
    },
  });
};

export default useUpdateBlogTagMutation;
