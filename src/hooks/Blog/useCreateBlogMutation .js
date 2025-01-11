import { useMutation } from '@tanstack/react-query';
import { createBlog } from 'src/api/Blog/Blog';

const useCreateBlogMutation = () => {
  return useMutation({
    mutationFn: createBlog,
    onSuccess: (data) => {
      console.log('Blog created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating Blog:', error);
    },
  });
};

export default useCreateBlogMutation;
