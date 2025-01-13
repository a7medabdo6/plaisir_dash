import { useQuery } from '@tanstack/react-query';
import { getSingleFooterContent } from 'src/api/FooterContent/FooterContent';

const useSingleFooterContent = () => {
  return useQuery({
    queryKey: ['FooterContent'],  // Key includes the FooterContentId to differentiate cache entries
    queryFn: () => getSingleFooterContent(),  // Fetch FooterContent by ID
    onError: (error) => {
      console.error('Error fetching FooterContent:', error);
    },
  });
};

export default useSingleFooterContent;
