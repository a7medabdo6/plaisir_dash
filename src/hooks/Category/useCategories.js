// src/hooks/useCategories.js

import { useQuery } from '@tanstack/react-query';
import { getCategories } from 'src/api/Category/Category';
const useCategories = (params) => {
  return useQuery({
    queryKey: ['categories', params],  // This key includes params to differentiate cache entries
    queryFn: () => getCategories(params),   // Pass params to the query function
    enabled: !!params,  // Only fetch data if params are provided
    // You can add options here like refetching behavior, caching, etc.
  });
};

export default useCategories;