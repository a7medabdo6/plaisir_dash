import { useQuery } from '@tanstack/react-query';
import { getSingleUser } from 'src/api/Users/Users';

const useSingleUser = (UserId) => {
  return useQuery({
    queryKey: ['User', UserId],  // Key includes the UserId to differentiate cache entries
    queryFn: () => getSingleUser(UserId),  // Fetch User by ID
    enabled: !!UserId,  // Only fetch data if UserId is provided
    onError: (error) => {
      console.error('Error fetching User:', error);
    },
  });
};

export default useSingleUser;
