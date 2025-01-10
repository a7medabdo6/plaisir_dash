// src/hooks/useFAQs.js

import { useQuery } from '@tanstack/react-query';
import { getFAQs } from 'src/api/FAQ/FAQ';
const useFAQs = (params) => {
  return useQuery({
    queryKey: ['FAQs', params],  // This key includes params to differentiate cache entries
    queryFn: () => getFAQs(params),   // Pass params to the query function
    enabled: !!params,  // Only fetch data if params are provided
    // You can add options here like refetching behavior, caching, etc.
  });
};

export default useFAQs;