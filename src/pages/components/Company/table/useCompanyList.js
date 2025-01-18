import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import useDeleteCompanyMutation from 'src/hooks/Company/useDeleteCompanyMutation';
import useCompany from 'src/hooks/Company/useCompany';

export default function useCompanyList(initialParams,pageCount, filterName, filterRole, filterStatus) {
  const [params, setParams] = useState(initialParams);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setParams((prevParams) => ({
      ...prevParams,
      page:pageCount,
      filterOptions: { ...prevParams.filterOptions, searchValue: filterName },
    }));
  }, [filterName,pageCount]);

  const { data, isLoading, isError, error } = useCompany(params);
  const [total, setTotal] = useState(data?.total);
  useEffect(() => {
    if (data) {
      setTotal(data.total);
    }
  }, [data]);

  const { mutate: deleteCompany } = useDeleteCompanyMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteCompany = (CompanyId) => {
    setLoading(true);
    deleteCompany(CompanyId, {
      onSuccess: () => {
        enqueueSnackbar('Delete successful', { variant: 'success' });
        setLoading(false);
      },
      onError: (error) => {
        console.error('Error deleting Company:', error);
        enqueueSnackbar('Delete failed', { variant: 'error' });
        setLoading(false);
      },
    });
  };

  const applyFilter = (inputData) => {
    let filteredData = inputData;
  
    if (filterName) {
      const lowercasedFilterName = filterName ? filterName.toString().toLowerCase() : '';
      filteredData = filteredData.filter((Company) =>
        Company.name_en.toLowerCase().includes(lowercasedFilterName)
      );
    }
  
    if (filterStatus !== 'all') {
      filteredData = filteredData.filter((Company) => Company.status === filterStatus);
    }
  
    if (filterRole !== 'all') {
      filteredData = filteredData.filter((Company) => Company.role === filterRole);
    }
  
    return filteredData;
  };
  

  const dataFiltered = applyFilter(data?.data || []);
  const isFiltered = filterName !== '' || filterRole !== 'all' || filterStatus !== 'all';

  return {
    loading,
    total,
    data,
    isFiltered,
    handleDeleteCompany,
  };
}
