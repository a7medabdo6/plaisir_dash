import { useMutation } from '@tanstack/react-query';
import { updateCategory } from 'src/api/Category/Category';  // Adjust the import path

const useUpdateCategoryMutation = () => {
  return useMutation({
    mutationFn: updateCategory,  // دالة التحديث
    onSuccess: (data) => {
      console.log('Category updated successfully:', data);
      // يمكن إضافة أي إجراءات إضافية بعد النجاح، مثل تحديث البيانات في الواجهة
    },
    onError: (error) => {
      console.error('Error updating category:', error);
    },
  });
};

export default useUpdateCategoryMutation;
