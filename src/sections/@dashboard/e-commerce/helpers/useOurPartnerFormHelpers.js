// useBlogFormHelpers.js
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSingleOurPartner from 'src/hooks/OurPartner/useSingleOurPartner';
import useUpdateOurPartnerMutation from 'src/hooks/OurPartner/useUpdateOurPartnerMutation';
import useUploadMutation from 'src/hooks/useUploadMutation';
import { useLocales } from 'src/locales';
import * as Yup from 'yup';




export function useStepHandlerOurPartner(currentOurPartner) {
    const { translate } = useLocales();
    const [dataLoaded, setDataLoaded] = useState(false);
    const { data: OurPartnersData, isError } = useSingleOurPartner();
    const { mutateAsync: updateOurPartner, isLoading: isUpdating } = useUpdateOurPartnerMutation();
    const { enqueueSnackbar } = useSnackbar();
    const uploadMutation = useUploadMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFileDetails, setUploadedFileDetails] = useState({
      partner_photo_1: null,
      partner_photo_2: null,
      banner_partner_photo: null,
      
    });

    useEffect(() => {
      if (OurPartnersData) {
        setDataLoaded(true); // تعيين أن البيانات قد تم تحميلها
      }
    }, [OurPartnersData]);

    const NewOurPartnerSchema = Yup.object().shape({
      partner_title_ar: Yup.string().required(`${translate('OurPartner.partner_title_ar.error')}`),
      partner_title_en: Yup.string().required(`${translate('OurPartner.partner_title_en.error')}`),
      partner_subtitle_ar: Yup.string().required(`${translate('OurPartner.partner_subtitle_ar.error')}`),
      partner_subtitle_en: Yup.string().required(`${translate('OurPartner.partner_subtitle_en.error')}`),
      why_partner_title_en: Yup.string().required(`${translate('OurPartner.why_partner_title_en.error')}`),
      why_partner_title_ar: Yup.string().required(`${translate('OurPartner.why_partner_title_ar.error')}`),
      why_partner_answer_en: Yup.string().required(`${translate('OurPartner.why_partner_answer_en.error')}`),
      why_partner_answer_ar: Yup.string().required(`${translate('OurPartner.why_partner_answer_ar.error')}`),
      banner_partner_photo: Yup.object().shape({
        id: Yup.string().required(`${translate('OurPartner.banner_partner_photo.error')}`),
        path: Yup.string().url(`${translate('OurPartner.banner_partner_photo.path.error')}`).required(),
        __entity: Yup.string().oneOf(['FileEntity'], `${translate('OurPartner.banner_partner_photo.entity.error')}`)
      }),
      partner_photo_1: Yup.object().shape({
        id: Yup.string().required(`${translate('OurPartner.partner_photo_1.error')}`),
        path: Yup.string().url(`${translate('OurPartner.partner_photo_1.path.error')}`).required(),
        __entity: Yup.string().oneOf(['FileEntity'], `${translate('OurPartner.partner_photo_1.entity.error')}`)
      }),
      partner_photo_2: Yup.object().shape({
        id: Yup.string().required(`${translate('OurPartner.partner_photo_2.error')}`),
        path: Yup.string().url(`${translate('OurPartner.partner_photo_2.path.error')}`).required(),
        __entity: Yup.string().oneOf(['FileEntity'], `${translate('OurPartner.partner_photo_2.entity.error')}`)
      })
    });
    
    
    

    const [defaultValues, setDefaultValues] = useState({
      partner_title_ar: "أماكن رائعة للاسترخاء",
      partner_title_en: "Amazing places to relax",
      partner_subtitle_ar: "أماكن رائعة للاسترخاء",
      partner_subtitle_en: "Amazing places to relax",
      why_partner_title_en: "Amazing places to relax",
      why_partner_title_ar: "أماكن رائعة للاسترخاء",
      why_partner_answer_en: "Amazing places to relax",
      why_partner_answer_ar: "أماكن رائعة للاسترخاء",
      banner_partner_photo: {
        id: "160d8286-bb80-4045-9e5c-c264caa882b6",
      
      },
      partner_photo_1: {
        id: "176bc58b-ea10-4c2b-861c-2c91b40b5043",
     
      },
      partner_photo_2: {
        id: "184626b4-4782-4fa0-8619-47e78b47b0a6",
   
      },

    });
    
    

    useEffect(() => {
      if (dataLoaded && OurPartnersData) {
        setDefaultValues((prevValues) => ({
          ...prevValues,
          partner_title_ar: OurPartnersData.partner_title_ar || prevValues.partner_title_ar,
          partner_title_en: OurPartnersData.partner_title_en || prevValues.partner_title_en,
          partner_subtitle_ar: OurPartnersData.partner_subtitle_ar || prevValues.partner_subtitle_ar,
          partner_subtitle_en: OurPartnersData.partner_subtitle_en || prevValues.partner_subtitle_en,
          why_partner_title_en: OurPartnersData.why_partner_title_en || prevValues.why_partner_title_en,
          why_partner_title_ar: OurPartnersData.why_partner_title_ar || prevValues.why_partner_title_ar,
          why_partner_answer_en: OurPartnersData.why_partner_answer_en || prevValues.why_partner_answer_en,
          why_partner_answer_ar: OurPartnersData.why_partner_answer_ar || prevValues.why_partner_answer_ar,
      
          banner_partner_photo: {
            id: OurPartnersData?.banner_partner_photo?.id || prevValues.banner_partner_photo.id,
      
          },
          partner_photo_1: {
            id: OurPartnersData?.partner_photo_1?.id || prevValues.partner_photo_1.id,
        
          },
          partner_photo_2: {
            id: OurPartnersData?.partner_photo_2?.id || prevValues.partner_photo_2.id,
      
          },
        }));
      }
    }, [OurPartnersData, dataLoaded]);
    


const onSubmit = async (formData) => {
  try {
   
    const updatedOurPartner = {
      id: OurPartnersData?.id,
      partner_title_ar: formData.partner_title_ar || OurPartnersData?.partner_title_ar,
      partner_title_en: formData.partner_title_en || OurPartnersData?.partner_title_en,
      partner_subtitle_ar: formData.partner_subtitle_ar || OurPartnersData?.partner_subtitle_ar,
      partner_subtitle_en: formData.partner_subtitle_en || OurPartnersData?.partner_subtitle_en,
      why_partner_title_en: formData.why_partner_title_en || OurPartnersData?.why_partner_title_en,
      why_partner_title_ar: formData.why_partner_title_ar || OurPartnersData?.why_partner_title_ar,
      why_partner_answer_en: formData.why_partner_answer_en || OurPartnersData?.why_partner_answer_en,
      why_partner_answer_ar: formData.why_partner_answer_ar || OurPartnersData?.why_partner_answer_ar,

      banner_partner_photo: {
        id: uploadedFileDetails.banner_partner_photo?.id || OurPartnersData?.banner_partner_photo?.id,
     
      },
      partner_photo_1: {
        id: uploadedFileDetails.partner_photo_1?.id || OurPartnersData?.partner_photo_1?.id,
       
      },
      partner_photo_2: {
        id: uploadedFileDetails.partner_photo_2?.id || OurPartnersData?.partner_photo_2?.id,
     
      },
    };
    
    
    
      updateOurPartner(updatedOurPartner);
      enqueueSnackbar(`${translate('editSuccess')}`, { variant: 'success' });
    
    // navigate(PATH_DASHBOARD.home);
  } catch (error) {
    enqueueSnackbar(translate('OurPartner.error'), { variant: 'error' });
  }
};

const [file, setFile] = useState(null);
const [fileId, setFileId] = useState(null);
const methods = useForm({
  resolver: yupResolver(NewOurPartnerSchema),
  defaultValues,
});
const {
reset,
watch,
setValue,
handleSubmit,
formState: { isSubmitting, errors },
} = methods;

const handleDrop = useCallback(
  (acceptedFiles, fieldName) => {
    const newFile = acceptedFiles[0];  // استقبل ملف واحد فقط
    if (newFile) {
      Object.assign(newFile, {
        preview: URL.createObjectURL(newFile),
      });

      setFile(newFile);  // حفظ الملف في state
      setValue(fieldName, newFile, { shouldValidate: true });  // استبدل الصورة السابقة
    }
  },
  [setValue]
);



const onUpload = (fileType) => {
  if (!file) {
    alert('Please select a file first.');
    return;
  }
  setIsLoading(true);

  uploadMutation.mutate(file, {
    onSuccess: (data) => {
      setIsLoading(false);

      const uploadedFile = data.file;

      // Update the field based on fileType
      setUploadedFileDetails((prevState) => {
        switch (fileType) {
          case 'partner_photo_2':
            return {
              ...prevState,
              partner_photo_2: { id: uploadedFile.id, path: uploadedFile.path },
            };
          case 'partner_photo_1':
            return {
              ...prevState,
              partner_photo_1: { id: uploadedFile.id, path: uploadedFile.path },
            };
          case 'banner_partner_photo':
            return {
              ...prevState,
              banner_partner_photo: { id: uploadedFile.id, path: uploadedFile.path },
            };
        
       
        
          default:
            return prevState;
        }
      });

      // Update form values for the uploaded file
      setValue(fileType, { id: uploadedFile.id, path: uploadedFile.path }, { shouldValidate: true });

      enqueueSnackbar(`${translate('imageUploadSuccess')}`, { variant: 'success' });
    },
    onError: (error) => {
      setIsLoading(false);
      console.error('Upload failed:', error);
    },
  });
};
  return {
    defaultValues,NewOurPartnerSchema,OurPartnersData,onSubmit,onUpload,isLoading,handleDrop,uploadedFileDetails
  };
}
