import { useMutation } from '@tanstack/react-query';
import { updateFAQ } from 'src/api/FAQ/FAQ';

const useUpdateFAQMutation = () => {
  return useMutation({
    mutationFn: updateFAQ,  // دالة التحديث
    onSuccess: (data) => {
      console.log('FAQ updated successfully:', data);
    },
    onError: (error) => {
    },
  });
};

export default useUpdateFAQMutation;
