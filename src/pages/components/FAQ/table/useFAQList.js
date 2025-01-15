import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import useFAQs from 'src/hooks/FAQ/useFAQ';
import useDeleteFAQMutation from 'src/hooks/FAQ/useDeleteFAQMutation';

export default function useFAQList(initialParams,pageCount, filterName, filterRole, filterStatus) {
  const [params, setParams] = useState(initialParams);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setParams((prevParams) => ({
      ...prevParams,
      page:pageCount,
      filterOptions: { ...prevParams.filterOptions, searchValue: filterName },
    }));
  }, [filterName,pageCount]);

  const { data, isLoading, isError, error } = useFAQs(params);
  const [total, setTotal] = useState(data?.total);
  useEffect(() => {
    if (data) {
      setTotal(data.total);
    }
  }, [data]);

  const { mutate: deleteFeature } = useDeleteFAQMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteFeature = (featureId) => {
    setLoading(true);
    deleteFeature(featureId, {
      onSuccess: () => {
        enqueueSnackbar('Delete successful', { variant: 'success' });
        setLoading(false);
      },
      onError: (error) => {
        console.error('Error deleting feature:', error);
        enqueueSnackbar('Delete failed', { variant: 'error' });
        setLoading(false);
      },
    });
  };

  const applyFilter = (inputData) => {
    let filteredData = inputData;
  
    if (filterName) {
      const lowercasedFilterName = filterName ? filterName?.toString().toLowerCase() : '';
      filteredData = filteredData?.filter((feature) =>
        feature?.ques_en?.toLowerCase().includes(lowercasedFilterName)
      );
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
    handleDeleteFeature,
  };
}
