import { useMutation } from '@tanstack/react-query';
import { createFeature } from 'src/api/Features/Features';

const useCreateFeatureMutation = () => {
  return useMutation({
    mutationFn: createFeature,
    onSuccess: (data) => {
      console.log('Feature created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating Feature:', error);
    },
  });
};

export default useCreateFeatureMutation;
