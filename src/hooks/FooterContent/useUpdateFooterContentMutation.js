import { useMutation } from '@tanstack/react-query';
import { updateFooterContent } from 'src/api/FooterContent/FooterContent';

const useUpdateFooterContentMutation = () => {
  return useMutation({
    mutationFn: updateFooterContent,  // دالة التحديث
    onSuccess: (data) => {
      console.log('FooterContent updated successfully:', data);
    },
    onError: (error) => {
    },
  });
};

export default useUpdateFooterContentMutation;
