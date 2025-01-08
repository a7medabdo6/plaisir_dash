import { useState, useEffect } from 'react';
import useCategories from 'src/hooks/Category/useCategories';
import useDeleteCategoryMutation from 'src/hooks/Category/useDeleteCategoryMutation';
import { useSnackbar } from 'notistack';
import { useLocales } from 'src/locales';

export const useCategoryList = ({ limit, offset, page, order, orderBy, filterName, filterRole, filterStatus,pageCount,
  setpageCount,loading, setLoading,setOpenConfirm }) => {
  const { data, isLoading, isError, error, refetch } = useCategories({ limit,  page:pageCount });
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();


  const { mutate: deleteCategoryMutation } = useDeleteCategoryMutation();


  const applyFilter = () => {
    let filteredData = data?.data;

    if (filterName) {
      filteredData = filteredData.filter((category) => {
        const nameInEnglish = category.name_en ? category.name_en.toLowerCase() : '';
        const nameInArabic = category.name_ar ? category.name_ar.toLowerCase() : '';
        return nameInEnglish.includes(filterName.toLowerCase()) || nameInArabic.includes(filterName.toLowerCase());
      });
    }

    return filteredData;
  };

  const handleDeleteCategory = (categoryId) => {
    setLoading(true)
    deleteCategoryMutation(categoryId, {
      onSuccess: () => {
        // عرض رسالة النجاح باستخدام useSnackbar
        enqueueSnackbar(`${translate('deleteSuccess')}`, { variant: 'success' });
        setLoading(false)
        setOpenConfirm(false)

      },
      onError: (error) => {
        console.error('Error deleting category:', error);
        // عرض رسالة الخطأ باستخدام useSnackbar
        enqueueSnackbar(`${translate('deleteError')}`, { variant: 'error' });
        setLoading(false)

      },
    });
  };


  return {
    data,
    applyFilter,
    handleDeleteCategory,
    isLoading,
    isError,
    error,
    refetch
  };
};
