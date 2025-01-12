import { useMutation } from '@tanstack/react-query';
import { updateHomeContent } from 'src/api/HomeContent/HomeContent';

const useUpdateHomeContentMutation = () => {
  return useMutation({
    mutationFn: updateHomeContent,  // دالة التحديث
    onSuccess: (data) => {
      console.log('HomeContent updated successfully:', data);
    },
    onError: (error) => {
    },
  });
};

export default useUpdateHomeContentMutation;
