import { useMutation } from '@tanstack/react-query';
import { createCompany } from 'src/api/Company/Company';

const useCreateCompanyMutation = () => {
  return useMutation({
    mutationFn: createCompany,
    onSuccess: (data) => {
      console.log('Company created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating Company:', error);
    },
  });
};

export default useCreateCompanyMutation;
