import { useQuery } from '@tanstack/react-query';
import { getSingleCompany } from 'src/api/Company/Company';

const useSingleCompany = (CompanyId) => {
  return useQuery({
    queryKey: ['Company', CompanyId],  // Key includes the CompanyId to differentiate cache entries
    queryFn: () => getSingleCompany(CompanyId),  // Fetch Company by ID
    enabled: !!CompanyId,  // Only fetch data if CompanyId is provided
    onError: (error) => {
      console.error('Error fetching Company:', error);
    },
  });
};

export default useSingleCompany;
