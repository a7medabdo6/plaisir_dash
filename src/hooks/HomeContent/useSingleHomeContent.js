import { useQuery } from '@tanstack/react-query';
import { getSingleHomeContent } from 'src/api/HomeContent/HomeContent';

const useSingleHomeContent = () => {
  return useQuery({
    queryKey: ['HomeContent'],  // Key includes the HomeContentId to differentiate cache entries
    queryFn: () => getSingleHomeContent(),  // Fetch HomeContent by ID
    onError: (error) => {
      console.error('Error fetching HomeContent:', error);
    },
  });
};

export default useSingleHomeContent;
