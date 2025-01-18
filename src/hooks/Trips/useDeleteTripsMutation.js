import { useMutation } from '@tanstack/react-query';
import { deleteTrip } from 'src/api/Trips/Trips';

const useDeleteTripMutation = () => {
  return useMutation({
    mutationFn: deleteTrip,
    onSuccess: (data, TripId) => {
      console.log(`Trip with ID ${TripId} deleted successfully`, data);
      // Optional: You can invalidate queries or refetch categories here
    },
    onError: (error) => {
      console.error('Error deleting Trip:', error);
    },
  });
};

export default useDeleteTripMutation;
