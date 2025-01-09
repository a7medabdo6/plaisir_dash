import { useQuery } from '@tanstack/react-query';
import { getSingleFeature } from 'src/api/Features/Features';

const useSingleFeature = (FeatureId) => {
  return useQuery({
    queryKey: ['Feature', FeatureId],  // Key includes the FeatureId to differentiate cache entries
    queryFn: () => getSingleFeature(FeatureId),  // Fetch Feature by ID
    enabled: !!FeatureId,  // Only fetch data if FeatureId is provided
    onError: (error) => {
      console.error('Error fetching Feature:', error);
    },
  });
};

export default useSingleFeature;
