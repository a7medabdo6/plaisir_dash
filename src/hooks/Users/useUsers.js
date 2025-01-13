// src/hooks/useUser.js

import { useQuery } from '@tanstack/react-query';
import { getUsers } from 'src/api/Users/Users';
const useUser = (params) => {
  return useQuery({
    queryKey: ['User', params],  // This key includes params to differentiate cache entries
    queryFn: () => getUsers(params),   // Pass params to the query function
    enabled: !!params,  // Only fetch data if params are provided
    // You can add options here like refetching behavior, caching, etc.
  });
};

export default useUser;