// src/hooks/useBlogs.js

import { useQuery } from '@tanstack/react-query';
import { getBlogs } from 'src/api/Blog/Blog';
const useBlogs = (params) => {
  return useQuery({
    queryKey: ['Blogs', params],  // This key includes params to differentiate cache entries
    queryFn: () => getBlogs(params),   // Pass params to the query function
    enabled: !!params,  // Only fetch data if params are provided
    // You can add options here like refetching behavior, caching, etc.
  });
};

export default useBlogs;