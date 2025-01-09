import { useMemo, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import useUpdateFeatureMutation from 'src/hooks/Features/useUpdateFeatureMutation';
import useCreateFeatureMutation from 'src/hooks/Features/useCreateFeatureMutation ';
import { useLocales } from 'src/locales';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

export const useFeatureFormHelpers = (isEdit, featureData) => {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const NewFeaturesSchema = Yup.object().shape({
    name_en: Yup.string().required(`${translate('features.errors.name_en_required')}`),
    name_ar: Yup.string().required(`${translate('features.errors.name_ar_required')}`),
    icon: Yup.string().required(`${translate('features.errors.icon_required')}`),
  });
  const defaultValues = useMemo(
    () => ({
      name_en: featureData?.name_en || '',
      name_ar: featureData?.name_ar || '',
      icon: featureData?.icon || '',
    }),
    [featureData]
  );
  const methods = useForm({
    resolver: yupResolver(NewFeaturesSchema),
    defaultValues: featureData || {}, 
  });
  useEffect(() => {
    if (featureData) {
      methods.reset(defaultValues);
    }
  }, [featureData, methods, defaultValues]);
  const { mutate: createFeature, isLoading: isCreating } = useCreateFeatureMutation();
  const { mutate: updateFeatureMutation, isLoading: isUpdating } = useUpdateFeatureMutation();
  const onSubmit = (formData) => {
    setIsProcessing(true); // Set processing to true
    if (isEdit) {
      const updatedFeature = {
        id: featureData?.id,
        name_en: formData.name_en || featureData.name_en,
        name_ar: formData.name_ar || featureData.name_ar,
        icon: formData.icon || featureData.icon,
      };
      updateFeatureMutation(updatedFeature, {
        onSuccess: () => {
          enqueueSnackbar(translate('editSuccess'), { variant: 'success' });
          navigate('/dashboard/features');
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
        name_en: formData.name_en || '',
        name_ar: formData.name_ar || '',
        icon: formData.icon || '',
      };
      createFeature(data, {
        onSuccess: () => {
          enqueueSnackbar(translate('addSuccess'), { variant: 'success' });
          navigate('/dashboard/features');
        },
        onError: (error) => {
          enqueueSnackbar(translate('addError'), { variant: 'error' });
          console.error('Error creating feature:', error);
        },
        onSettled: () => {
          setIsProcessing(false); // Set processing to false
        },
      });
    }
  };

  return {
    NewFeaturesSchema,
    isProcessing,
    defaultValues,
    onSubmit,
    isCreating,
    isUpdating,
    methods,
  };
};
