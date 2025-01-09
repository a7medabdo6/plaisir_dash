// src/hooks/Features/useFeaturesList.js
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import useDeleteFeatureMutation from 'src/hooks/Features/useDeleteFeatureMutation';
import useFeatures from 'src/hooks/Features/useFeatures';

export default function useFeaturesList(initialParams,pageCount, filterName, filterRole, filterStatus) {
  const [params, setParams] = useState(initialParams);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setParams((prevParams) => ({
      ...prevParams,
      page:pageCount,
      filterOptions: { ...prevParams.filterOptions, searchValue: filterName },
    }));
  }, [filterName,pageCount]);

  const { data, isLoading, isError, error } = useFeatures(params);
  const [total, setTotal] = useState(data?.total);
  console.log(filterName);
  

  useEffect(() => {
    if (data) {
      setTotal(data.total);
    }
  }, [data]);

  const { mutate: deleteFeature } = useDeleteFeatureMutation();
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
      // Ensure filterName is a string before using .toLowerCase()
      const lowercasedFilterName = filterName ? filterName.toString().toLowerCase() : '';
      filteredData = filteredData.filter((feature) =>
        feature.name_en.toLowerCase().includes(lowercasedFilterName)
      );
    }
  
    if (filterStatus !== 'all') {
      filteredData = filteredData.filter((feature) => feature.status === filterStatus);
    }
  
    if (filterRole !== 'all') {
      filteredData = filteredData.filter((feature) => feature.role === filterRole);
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
