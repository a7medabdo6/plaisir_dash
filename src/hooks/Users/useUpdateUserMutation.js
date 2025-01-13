import { useMutation } from '@tanstack/react-query';
import { updateUser } from 'src/api/Users/Users';

const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: updateUser,  // دالة التحديث
    onSuccess: (data) => {
      console.log('User updated successfully:', data);
      // يمكن إضافة أي إجراءات إضافية بعد النجاح، مثل تحديث البيانات في الواجهة
    },
    onError: (error) => {
      console.error('Error updating User:', error);
    },
  });
};

export default useUpdateUserMutation;
