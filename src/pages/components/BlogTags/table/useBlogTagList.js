import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import useBlogTags from 'src/hooks/BlogTags/useBlogTag';
import useDeleteBlogTagMutation from 'src/hooks/BlogTags/useDeleteBlogTagMutation';

export default function useBlogTagsList(initialParams,pageCount, filterName, filterRole, filterStatus) {
  const [params, setParams] = useState(initialParams);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setParams((prevParams) => ({
      ...prevParams,
      page:pageCount,
      filterOptions: { ...prevParams.filterOptions, searchValue: filterName },
    }));
  }, [filterName,pageCount]);

  const { data, isLoading, isError, error } = useBlogTags(params);
  const [total, setTotal] = useState(data?.total);
  useEffect(() => {
    if (data) {
      setTotal(data.total);
    }
  }, [data]);

  const { mutate: deleteBlogTag } = useDeleteBlogTagMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBlogTag = (BlogTagId) => {
    setLoading(true);
    deleteBlogTag(BlogTagId, {
      onSuccess: () => {
        enqueueSnackbar('Delete successful', { variant: 'success' });
        setLoading(false);
      },
      onError: (error) => {
        console.error('Error deleting BlogTag:', error);
        enqueueSnackbar('Delete failed', { variant: 'error' });
        setLoading(false);
      },
    });
  };

  const applyFilter = (inputData) => {
    let filteredData = inputData;
  
    if (filterName) {
      const lowercasedFilterName = filterName ? filterName.toString().toLowerCase() : '';
      filteredData = filteredData.filter((BlogTag) => {
        const title = BlogTag?.title_en?.toString().toLowerCase() || '';
        return title.includes(lowercasedFilterName);
      });
    }
  
    if (filterStatus !== 'all') {
      filteredData = filteredData.filter((BlogTag) => BlogTag.status === filterStatus);
    }
  
    if (filterRole !== 'all') {
      filteredData = filteredData.filter((BlogTag) => BlogTag.role === filterRole);
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
    handleDeleteBlogTag,
  };
}
