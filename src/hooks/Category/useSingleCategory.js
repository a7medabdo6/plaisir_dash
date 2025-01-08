import { useQuery } from '@tanstack/react-query';
import { getSingleCategory } from 'src/api/Category/Category';  // Adjust the import path

const useSingleCategory = (categoryId) => {
  return useQuery({
    queryKey: ['category', categoryId],  // Key includes the categoryId to differentiate cache entries
    queryFn: () => getSingleCategory(categoryId),  // Fetch category by ID
    enabled: !!categoryId,  // Only fetch data if categoryId is provided
    onError: (error) => {
      console.error('Error fetching category:', error);
    },
  });
};

export default useSingleCategory;
