import { useMemo, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { useLocales } from 'src/locales';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import useCreateFAQMutation from 'src/hooks/FAQ/useCreateFAQMutation ';
import useUpdateFAQMutation from 'src/hooks/FAQ/useUpdateFAQMutation';

export const useFAQFormHelpers = (isEdit, featureData) => {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const NewFAQSchema = Yup.object().shape({
    ques_en: Yup.string().required(`${translate('faq.errors.ques_en_required')}`),
    ques_ar: Yup.string().required(`${translate('faq.errors.ques_ar_required')}`),
    answer_en: Yup.string().required(`${translate('faq.errors.answer_en_required')}`),
    answer_ar: Yup.string().required(`${translate('faq.errors.answer_ar_required')}`),
  });

  const defaultValues = useMemo(
    () => ({
      ques_en: featureData?.ques_en || '',
      ques_ar: featureData?.ques_ar || '',
      answer_en: featureData?.answer_en || '',
      answer_ar: featureData?.answer_ar || '',
    }),
    [featureData]
  );
  const methods = useForm({
    resolver: yupResolver(NewFAQSchema),
    defaultValues: featureData || {}, 
  });
  useEffect(() => {
    if (featureData) {
      methods.reset(defaultValues);
    }
  }, [featureData, methods, defaultValues]);
  const { mutate: createFeature, isLoading: isCreating } = useCreateFAQMutation();
  const { mutate: updateFeatureMutation, isLoading: isUpdating } = useUpdateFAQMutation();
  const onSubmit = (formData) => {
    setIsProcessing(true); // Set processing to true
    if (isEdit) {
      const updatedFeature = {
        id: featureData?.id,
        ques_en: formData.ques_en || featureData.ques_en,
        ques_ar: formData.ques_ar || featureData.ques_ar,
        answer_en: formData.answer_en || featureData.answer_en,
        answer_ar: formData.answer_ar || featureData.answer_ar,
      };
      updateFeatureMutation(updatedFeature, {
        onSuccess: () => {
          enqueueSnackbar(translate('editSuccess'), { variant: 'success' });
          navigate('/dashboard/FAQ');
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
        ques_en: formData?.ques_en || '',
        ques_ar: formData?.ques_ar || '',
        answer_en: formData?.answer_en || '',
        answer_ar: formData?.answer_ar || '',
       
      };
      createFeature(data, {
        onSuccess: () => {
          enqueueSnackbar(translate('addSuccess'), { variant: 'success' });
          navigate('/dashboard/FAQ');
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
    NewFAQSchema,
    isProcessing,
    defaultValues,
    onSubmit,
    isCreating,
    isUpdating,
    methods,
  };
};
