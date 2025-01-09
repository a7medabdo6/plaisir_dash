import { useMutation } from '@tanstack/react-query';
import { updateFeature } from 'src/api/Features/Features';

const useUpdateFeatureMutation = () => {
  return useMutation({
    mutationFn: updateFeature,  // دالة التحديث
    onSuccess: (data) => {
      console.log('Feature updated successfully:', data);
    },
    onError: (error) => {
    },
  });
};

export default useUpdateFeatureMutation;
