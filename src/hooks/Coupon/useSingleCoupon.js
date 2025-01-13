import { useQuery } from '@tanstack/react-query';
import { getSingleCoupon } from 'src/api/Coupon/Coupon';

const useSingleCoupon = (CouponId) => {
  return useQuery({
    queryKey: ['Coupon', CouponId],  // Key includes the CouponId to differentiate cache entries
    queryFn: () => getSingleCoupon(CouponId),  // Fetch Coupon by ID
    enabled: !!CouponId,  // Only fetch data if CouponId is provided
    onError: (error) => {
      console.error('Error fetching Coupon:', error);
    },
  });
};

export default useSingleCoupon;
