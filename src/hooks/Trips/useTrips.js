// src/hooks/useTrips.js

import { useQuery } from '@tanstack/react-query';
import { getTrips } from 'src/api/Trips/Trips';
const useTrips = (params) => {
  return useQuery({
    queryKey: ['Trips', params],  // This key includes params to differentiate cache entries
    queryFn: () => getTrips(params),   // Pass params to the query function
    enabled: !!params,  // Only fetch data if params are provided
    // You can add options here like refetching behavior, caching, etc.
  });
};

export default useTrips;