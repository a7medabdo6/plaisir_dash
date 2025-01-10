// src/hooks/useBlogTags.js

import { useQuery } from '@tanstack/react-query';
import { getBlogTags } from 'src/api/BlogsTags/BlogsTags';
const useBlogTags = (params) => {
  return useQuery({
    queryKey: ['BlogTags', params],  // This key includes params to differentiate cache entries
    queryFn: () => getBlogTags(params),   // Pass params to the query function
    enabled: !!params,  // Only fetch data if params are provided
    // You can add options here like refetching behavior, caching, etc.
  });
};

export default useBlogTags;