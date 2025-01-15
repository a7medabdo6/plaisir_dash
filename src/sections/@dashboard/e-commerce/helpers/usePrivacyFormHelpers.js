// useBlogFormHelpers.js
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSinglePrivacy from 'src/hooks/Privacy/useSinglePrivacy';
import useUpdatePrivacyMutation from 'src/hooks/Privacy/useUpdatePrivacyMutation';

import { useLocales } from 'src/locales';
import * as Yup from 'yup';



export function useStepHandlerPrivacy(currentPrivacy) {
  const { translate } = useLocales();
  const [dataLoaded, setDataLoaded] = useState(false);
  const { data: PrivacyData, isError } = useSinglePrivacy();
  const { mutateAsync: updatePrivacy } = useUpdatePrivacyMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (PrivacyData) {
      setDataLoaded(true); // تعيين أن البيانات قد تم تحميلها
    }
  }, [PrivacyData]);

  const NewPrivacychema = Yup.object().shape({
    content_en: Yup.string().required(`${translate('Privacy.content_en.error')}`),
    content_ar: Yup.string().required(`${translate('Privacy.content_ar.error')}`),

  });



  const [defaultValues, setDefaultValues] = useState({

    content_en: "Feel Real Adventure and Very Close to Nature",
    content_ar: "اشعر بالمغامرة الحقيقية وقريب جدًا من الطبيعة",

  });


  useEffect(() => {
    if (PrivacyData) {
      setDefaultValues({
        content_en: PrivacyData.content_en || "Feel Real Adventure and Very Close to Nature",
        content_ar: PrivacyData.content_ar || "اشعر بالمغامرة الحقيقية وقريب جدًا من الطبيعة",
      });
    }
  }, [PrivacyData]);
  


  const onSubmit = async (formData) => {
    setIsLoading(true)

    try {

      const updatedPrivacy = {
        id: PrivacyData?.id,
        content_en: formData.content_en || PrivacyData?.content_en,
        content_ar: formData.content_ar || PrivacyData?.content_ar,

      };
     await updatePrivacy(updatedPrivacy);
      enqueueSnackbar(`${translate('editSuccess')}`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(translate('Privacy.error'), { variant: 'error' });
    }finally{
      setIsLoading(false)

    }
  };

  const methods = useForm({
    resolver: yupResolver(NewPrivacychema),
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
    defaultValues, NewPrivacychema, PrivacyData, onSubmit, isLoading
  };
}
