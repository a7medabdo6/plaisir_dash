// src/hooks/useCompanys.js

import { useQuery } from '@tanstack/react-query';
import { getCompanys } from 'src/api/Company/Company';
const useCompanys = (params) => {
  return useQuery({
    queryKey: ['Companys', params],  // This key includes params to differentiate cache entries
    queryFn: () => getCompanys(params),   // Pass params to the query function
    enabled: !!params,  // Only fetch data if params are provided
    // You can add options here like refetching behavior, caching, etc.
  });
};

export default useCompanys;