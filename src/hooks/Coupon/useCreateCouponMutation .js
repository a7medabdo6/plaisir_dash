import { useMutation } from '@tanstack/react-query';
import { createCoupon } from 'src/api/Coupon/Coupon';

const useCreateCouponMutation = () => {
  return useMutation({
    mutationFn: createCoupon,
    onSuccess: (data) => {
      console.log('Coupon created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating Coupon:', error);
    },
  });
};

export default useCreateCouponMutation;
