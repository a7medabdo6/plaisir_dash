import { useMutation } from '@tanstack/react-query';
import { deleteUser } from 'src/api/Users/Users';

const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (data, UserId) => {
      console.log(`User with ID ${UserId} deleted successfully`, data);
      // Optional: You can invalidate queries or refetch categories here
    },
    onError: (error) => {
      console.error('Error deleting User:', error);
    },
  });
};

export default useDeleteUserMutation;
