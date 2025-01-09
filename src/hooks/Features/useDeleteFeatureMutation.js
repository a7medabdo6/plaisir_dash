import { useMutation } from '@tanstack/react-query';
import { deleteFeature } from 'src/api/Features/Features';

const useDeleteFeatureMutation = () => {
  return useMutation({
    mutationFn: deleteFeature,
    onSuccess: (data, FeatureId) => {
      console.log(`Feature with ID ${FeatureId} deleted successfully`, data);
      // Optional: You can invalidate queries or refetch categories here
    },
    onError: (error) => {
      console.error('Error deleting Feature:', error);
    },
  });
};

export default useDeleteFeatureMutation;
