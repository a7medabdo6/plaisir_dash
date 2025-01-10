import { useQuery } from '@tanstack/react-query';
import { getSingleBlogTag } from 'src/api/BlogsTags/BlogsTags';

const useSingleBlogTag = (BlogTagId) => {
  return useQuery({
    queryKey: ['BlogTag', BlogTagId],  // Key includes the BlogTagId to differentiate cache entries
    queryFn: () => getSingleBlogTag(BlogTagId),  // Fetch BlogTag by ID
    enabled: !!BlogTagId,  // Only fetch data if BlogTagId is provided
    onError: (error) => {
      console.error('Error fetching BlogTag:', error);
    },
  });
};

export default useSingleBlogTag;
