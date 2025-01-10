import { useMutation } from '@tanstack/react-query';
import { createBlogTag } from 'src/api/BlogsTags/BlogsTags';

const useCreateBlogTagMutation = () => {
  return useMutation({
    mutationFn: createBlogTag,
    onSuccess: (data) => {
      console.log('BlogTag created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating BlogTag:', error);
    },
  });
};

export default useCreateBlogTagMutation;
