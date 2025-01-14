import { useMutation } from '@tanstack/react-query';
import { updateTerms } from 'src/api/Terms/Terms';

const useUpdateTermsMutation = () => {
  return useMutation({
    mutationFn: updateTerms,  // دالة التحديث
    onSuccess: (data) => {
      console.log('Terms updated successfully:', data);
    },
    onError: (error) => {
    },
  });
};

export default useUpdateTermsMutation;
