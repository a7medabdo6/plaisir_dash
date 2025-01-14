import { useQuery } from '@tanstack/react-query';
import { getSingleTerms } from 'src/api/Terms/Terms';

const useSingleTerms = () => {
  return useQuery({
    queryKey: ['Terms'],  // Key includes the TermsId to differentiate cache entries
    queryFn: () => getSingleTerms(),  // Fetch Terms by ID
    onError: (error) => {
      console.error('Error fetching Terms:', error);
    },
  });
};

export default useSingleTerms;
