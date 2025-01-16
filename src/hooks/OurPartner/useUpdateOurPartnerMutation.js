import { useMutation } from '@tanstack/react-query';
import { updateOurPartner } from 'src/api/OurPartner/OurPartner';

const useUpdateOurPartnerMutation = () => {
  return useMutation({
    mutationFn: updateOurPartner,  // دالة التحديث
    onSuccess: (data) => {
      console.log('OurPartner updated successfully:', data);
    },
    onError: (error) => {
    },
  });
};

export default useUpdateOurPartnerMutation;
