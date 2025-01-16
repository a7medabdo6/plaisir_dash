import { useQuery } from '@tanstack/react-query';
import { getSingleOurPartner } from 'src/api/OurPartner/OurPartner';

const useSingleOurPartner = () => {
  return useQuery({
    queryKey: ['OurPartner'],  // Key includes the OurPartnerId to differentiate cache entries
    queryFn: () => getSingleOurPartner(),  // Fetch OurPartner by ID
    onError: (error) => {
      console.error('Error fetching OurPartner:', error);
    },
  });
};

export default useSingleOurPartner;
