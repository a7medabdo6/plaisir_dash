import { useQuery } from '@tanstack/react-query';
import { getSinglePrivacy } from 'src/api/Privacy/Privacy';

const useSinglePrivacy = () => {
  return useQuery({
    queryKey: ['Privacy'],  // Key includes the PrivacyId to differentiate cache entries
    queryFn: () => getSinglePrivacy(),  // Fetch Privacy by ID
    onError: (error) => {
      console.error('Error fetching Privacy:', error);
    },
  });
};

export default useSinglePrivacy;
