import { useQuery } from '@tanstack/react-query';
import { getSingleTrip } from 'src/api/Trips/Trips';

const useSingleTrip = (TriptureId) => {
  return useQuery({
    queryKey: ['Tripture', TriptureId],  // Key includes the TriptureId to differentiate cache entries
    queryFn: () => getSingleTrip(TriptureId),  // Fetch Tripture by ID
    enabled: !!TriptureId,  // Only fetch data if TriptureId is provided
    onError: (error) => {
      console.error('Error fetching Tripture:', error);
    },
  });
};

export default useSingleTrip;
