import { useMutation } from '@tanstack/react-query';
import { deleteCompany } from 'src/api/Company/Company';

const useDeleteCompanyMutation = () => {
  return useMutation({
    mutationFn: deleteCompany,
    onSuccess: (data, CompanyId) => {
      console.log(`Company with ID ${CompanyId} deleted successfully`, data);
      // Optional: You can invalidate queries or refetch categories here
    },
    onError: (error) => {
      console.error('Error deleting Company:', error);
    },
  });
};

export default useDeleteCompanyMutation;
