import { useMutation } from '@tanstack/react-query';
import { deleteFAQ } from 'src/api/FAQ/FAQ';

const useDeleteFAQMutation = () => {
  return useMutation({
    mutationFn: deleteFAQ,
    onSuccess: (data, FAQId) => {
      console.log(`FAQ with ID ${FAQId} deleted successfully`, data);
      // Optional: You can invalidate queries or refetch categories here
    },
    onError: (error) => {
      console.error('Error deleting FAQ:', error);
    },
  });
};

export default useDeleteFAQMutation;
