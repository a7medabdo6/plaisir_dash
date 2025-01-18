import { useMutation } from '@tanstack/react-query';
import { updateTrip } from 'src/api/Trips/Trips';

const useUpdateTripMutation = () => {
  return useMutation({
    mutationFn: updateTrip,  // دالة التحديث
    onSuccess: (data) => {
      console.log('Trip updated successfully:', data);
    },
    onError: (error) => {
    },
  });
};

export default useUpdateTripMutation;
