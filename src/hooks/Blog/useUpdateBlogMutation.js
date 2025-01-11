import { useMutation } from '@tanstack/react-query';
import { updateBlog } from 'src/api/Blog/Blog';

const useUpdateBlogMutation = () => {
  return useMutation({
    mutationFn: updateBlog,  // دالة التحديث
    onSuccess: (data) => {
      console.log('Blog updated successfully:', data);
    },
    onError: (error) => {
    },
  });
};

export default useUpdateBlogMutation;
