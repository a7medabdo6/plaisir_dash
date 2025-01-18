import { useMutation } from '@tanstack/react-query';
import { createTrip } from 'src/api/Trips/Trips';

const useCreateTripMutation = () => {
  return useMutation({
    mutationFn: createTrip,
    onSuccess: (data) => {
      console.log('Trip created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating Trip:', error);
    },
  });
};

export default useCreateTripMutation;
