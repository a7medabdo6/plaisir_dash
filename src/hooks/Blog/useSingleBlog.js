import { useQuery } from '@tanstack/react-query';
import { getSingleBlog } from 'src/api/Blog/Blog';

const useSingleBlog = (BlogId) => {
  return useQuery({
    queryKey: ['Blog', BlogId],  // Key includes the BlogId to differentiate cache entries
    queryFn: () => getSingleBlog(BlogId),  // Fetch Blog by ID
    enabled: !!BlogId,  // Only fetch data if BlogId is provided
    onError: (error) => {
      console.error('Error fetching Blog:', error);
    },
  });
};

export default useSingleBlog;
