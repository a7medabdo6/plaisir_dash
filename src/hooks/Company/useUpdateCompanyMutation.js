import { useMutation } from '@tanstack/react-query';
import { updateCompany } from 'src/api/Company/Company';

const useUpdateCompanyMutation = () => {
  return useMutation({
    mutationFn: updateCompany,  // دالة التحديث
    onSuccess: (data) => {
      console.log('Company updated successfully:', data);
    },
    onError: (error) => {
    },
  });
};

export default useUpdateCompanyMutation;
