import { useQuery } from '@tanstack/react-query';
import { getSingleFAQ } from 'src/api/FAQ/FAQ';

const useSingleFAQ = (FAQId) => {
  return useQuery({
    queryKey: ['FAQ', FAQId],  // Key includes the FAQId to differentiate cache entries
    queryFn: () => getSingleFAQ(FAQId),  // Fetch FAQ by ID
    enabled: !!FAQId,  // Only fetch data if FAQId is provided
    onError: (error) => {
      console.error('Error fetching FAQ:', error);
    },
  });
};

export default useSingleFAQ;
