import { useMemo, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { useLocales } from 'src/locales';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import useCreateBlogTagMutation from 'src/hooks/BlogTags/useCreateBlogTagMutation ';
import useUpdateBlogTagMutation from 'src/hooks/BlogTags/useUpdateBlogTagMutation';

export const useBlogTagsFormHelpers = (isEdit, BlogTageData) => {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const NewBlogTagsSchema = Yup.object().shape({
    title_ar: Yup.string().required(`${translate('BlogTags.errors.title_ar_required')}`),
    title_en: Yup.string().required(`${translate('BlogTags.errors.title_en_required')}`),
  });
  const defaultValues = useMemo(
    () => ({
      title_ar: BlogTageData?.title_ar || '',
      title_en: BlogTageData?.title_en || '',
    }),
    [BlogTageData]
  );
  const methods = useForm({
    resolver: yupResolver(NewBlogTagsSchema),
    defaultValues: BlogTageData || {}, 
  });
  useEffect(() => {
    if (BlogTageData) {
      methods.reset(defaultValues);
    }
  }, [BlogTageData, methods, defaultValues]);
  const { mutate: createBlogTage, isLoading: isCreating } = useCreateBlogTagMutation();
  const { mutate: updateBlogTageMutation, isLoading: isUpdating } = useUpdateBlogTagMutation();
  const onSubmit = (formData) => {
    setIsProcessing(true); // Set processing to true
    if (isEdit) {
      const updatedBlogTage = {
        id: BlogTageData?.id,
        title_en: formData.title_en || BlogTageData.title_en,
        title_ar: formData.title_ar || BlogTageData.title_ar,
      };
      updateBlogTageMutation(updatedBlogTage, {
        onSuccess: () => {
          enqueueSnackbar(translate('editSuccess'), { variant: 'success' });
          navigate('/dashboard/BlogTags');
        },
        onError: (error) => {
          enqueueSnackbar(translate('editError'), { variant: 'error' });
        },
        onSettled: () => {
          setIsProcessing(false); // Set processing to false
        },
      });
    } else {
      const data = {
        title_ar: formData.title_ar || '',
        title_en: formData.title_en || '',
      };
      createBlogTage(data, {
        onSuccess: () => {
          enqueueSnackbar(translate('addSuccess'), { variant: 'success' });
          navigate('/dashboard/BlogTags');
        },
        onError: (error) => {
          enqueueSnackbar(translate('addError'), { variant: 'error' });
          console.error('Error creating BlogTage:', error);
        },
        onSettled: () => {
          setIsProcessing(false); // Set processing to false
        },
      });
    }
  };

  return {
    NewBlogTagsSchema,
    isProcessing,
    defaultValues,
    onSubmit,
    isCreating,
    isUpdating,
    methods,
  };
};
