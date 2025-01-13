import { useMutation } from '@tanstack/react-query';
import { updateCoupon } from 'src/api/Coupon/Coupon';

const useUpdateCouponMutation = () => {
  return useMutation({
    mutationFn: updateCoupon,  // دالة التحديث
    onSuccess: (data) => {
      console.log('Coupon updated successfully:', data);
      // يمكن إضافة أي إجراءات إضافية بعد النجاح، مثل تحديث البيانات في الواجهة
    },
    onError: (error) => {
      console.error('Error updating Coupon:', error);
    },
  });
};

export default useUpdateCouponMutation;
