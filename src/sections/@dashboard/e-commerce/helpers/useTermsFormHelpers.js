// useBlogFormHelpers.js
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSingleTerms from 'src/hooks/Terms/useSingleTerms';
import useUpdateTermsMutation from 'src/hooks/Terms/useUpdateTermsMutation';
import useUploadMutation from 'src/hooks/useUploadMutation';
import { useLocales } from 'src/locales';
import * as Yup from 'yup';


export function useStepHandlerTerms(currentTerms) {
  const { translate } = useLocales();
  const [dataLoaded, setDataLoaded] = useState(false);
  const { data: TermssData, isError } = useSingleTerms();
  const { mutate: updateTerms, isLoading: isUpdating } = useUpdateTermsMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (TermssData) {
      setDataLoaded(true); // تعيين أن البيانات قد تم تحميلها
    }
  }, [TermssData]);

  const NewTermsSchema = Yup.object().shape({
    content_en: Yup.string().required(`${translate('Terms.content_en.error')}`),
    content_ar: Yup.string().required(`${translate('Terms.content_ar.error')}`),

  });



  const [defaultValues, setDefaultValues] = useState({

    content_en: "Feel Real Adventure and Very Close to Nature",
    content_ar: "اشعر بالمغامرة الحقيقية وقريب جدًا من الطبيعة",

  });


  useEffect(() => {
    if (dataLoaded && TermssData) {
      setDefaultValues((prevValues) => ({
        ...prevValues,
        content_en: TermssData.content_en || prevValues.content_en,
        content_ar: TermssData.content_ar || prevValues.content_ar,

      }));
    }
  }, [TermssData, dataLoaded]);


  const onSubmit = async (formData) => {
    try {

      const updatedTerms = {
        id: TermssData?.id,
        content_en: formData.content_en || TermssData?.content_en,
        content_ar: formData.content_ar || TermssData?.content_ar,

      };


      updateTerms(updatedTerms);
      enqueueSnackbar(`${translate('editSuccess')}`, { variant: 'success' });

      // navigate(PATH_DASHBOARD.home);
    } catch (error) {
      enqueueSnackbar(translate('Terms.error'), { variant: 'error' });
    }
  };

  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  const methods = useForm({
    resolver: yupResolver(NewTermsSchema),
    defaultValues,
  });
  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;






  return {
    defaultValues, NewTermsSchema, TermssData, onSubmit, isLoading
  };
}
