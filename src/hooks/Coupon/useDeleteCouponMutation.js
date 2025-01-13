import { useMutation } from '@tanstack/react-query';
import { deleteCoupon } from 'src/api/Coupon/Coupon';

const useDeleteCouponMutation = () => {
  return useMutation({
    mutationFn: deleteCoupon,
    onSuccess: (data, CouponId) => {
      console.log(`Coupon with ID ${CouponId} deleted successfully`, data);
      // Optional: You can invalidate queries or refetch categories here
    },
    onError: (error) => {
      console.error('Error deleting Coupon:', error);
    },
  });
};

export default useDeleteCouponMutation;
