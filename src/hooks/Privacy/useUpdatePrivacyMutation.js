import { useMutation } from '@tanstack/react-query';
import { updatePrivacy } from 'src/api/Privacy/Privacy';

const useUpdatePrivacyMutation = () => {
  return useMutation({
    mutationFn: updatePrivacy,  // دالة التحديث
    onSuccess: (data) => {
      console.log('Privacy updated successfully:', data);
    },
    onError: (error) => {
    },
  });
};

export default useUpdatePrivacyMutation;
