// src/hooks/useCoupon.js

import { useQuery } from '@tanstack/react-query';
import { getCoupons } from 'src/api/Coupon/Coupon';
const useCoupon = (params) => {
  return useQuery({
    queryKey: ['Coupon', params],  // This key includes params to differentiate cache entries
    queryFn: () => getCoupons(params),   // Pass params to the query function
    enabled: !!params,  // Only fetch data if params are provided
    // You can add options here like refetching behavior, caching, etc.
  });
};

export default useCoupon;