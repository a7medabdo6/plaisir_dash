// src/hooks/useFeatures.js

import { useQuery } from '@tanstack/react-query';
import { getFeatures } from 'src/api/Features/Features';
const useFeatures = (params) => {
  return useQuery({
    queryKey: ['Features', params],  // This key includes params to differentiate cache entries
    queryFn: () => getFeatures(params),   // Pass params to the query function
    enabled: !!params,  // Only fetch data if params are provided
    // You can add options here like refetching behavior, caching, etc.
  });
};

export default useFeatures;