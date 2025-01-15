// useBlogFormHelpers.js
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSingleFooterContent from 'src/hooks/FooterContent/useSingleFooterContent';
import useUpdateFooterContentMutation from 'src/hooks/FooterContent/useUpdateFooterContentMutation';
import useUploadMutation from 'src/hooks/useUploadMutation';
import { useLocales } from 'src/locales';
import * as Yup from 'yup';


export function useStepHandlerFooterContent(currentFooterContent) {
    const { translate } = useLocales();
    const [dataLoaded, setDataLoaded] = useState(false);
    const { data: FooterContentsData, isError } = useSingleFooterContent();
    const { mutateAsync: updateFooterContent, isLoading: isUpdating } = useUpdateFooterContentMutation();
    const { enqueueSnackbar } = useSnackbar();
    const uploadMutation = useUploadMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFileDetails, setUploadedFileDetails] = useState({
      logo: null,
      discount_photo: null,
      banner_photo_for_app: null,
      adventure_photo: null, // Added
      
    });

    useEffect(() => {
      if (FooterContentsData) {
        setDataLoaded(true); // تعيين أن البيانات قد تم تحميلها
      }
    }, [FooterContentsData]);

    const NewFooterContentSchema = Yup.object().shape({
      adventure_title_en: Yup.string().required(`${translate('FooterContent.adventure_title_en.error')}`),
      adventure_title_ar: Yup.string().required(`${translate('FooterContent.adventure_title_ar.error')}`),
      adventure_service_title_en_1: Yup.string().required(`${translate('FooterContent.adventure_service_title_en_1.error')}`),
      adventure_service_title_ar_1: Yup.string().required(`${translate('FooterContent.adventure_service_title_ar_1.error')}`),
      adventure_service_desc_en_1: Yup.string().required(`${translate('FooterContent.adventure_service_desc_en_1.error')}`),
      adventure_service_desc_ar_1: Yup.string().required(`${translate('FooterContent.adventure_service_desc_ar_1.error')}`),
      adventure_service_title_en_2: Yup.string().required(`${translate('FooterContent.adventure_service_title_en_2.error')}`),
      adventure_service_title_ar_2: Yup.string().required(`${translate('FooterContent.adventure_service_title_ar_2.error')}`),
      adventure_service_desc_en_2: Yup.string().required(`${translate('FooterContent.adventure_service_desc_en_2.error')}`),
      adventure_service_desc_ar_2: Yup.string().required(`${translate('FooterContent.adventure_service_desc_ar_2.error')}`),
      adventure_service_title_en_3: Yup.string().required(`${translate('FooterContent.adventure_service_title_en_3.error')}`),
      adventure_service_title_ar_3: Yup.string().required(`${translate('FooterContent.adventure_service_title_ar_3.error')}`),
      adventure_service_desc_en_3: Yup.string().required(`${translate('FooterContent.adventure_service_desc_en_3.error')}`),
      adventure_service_desc_ar_3: Yup.string().required(`${translate('FooterContent.adventure_service_desc_ar_3.error')}`),
      adventure_service_title_en_4: Yup.string().required(`${translate('FooterContent.adventure_service_title_en_4.error')}`),
      adventure_service_title_ar_4: Yup.string().required(`${translate('FooterContent.adventure_service_title_ar_4.error')}`),
      adventure_service_desc_en_4: Yup.string().required(`${translate('FooterContent.adventure_service_desc_en_4.error')}`),
      adventure_service_desc_ar_4: Yup.string().required(`${translate('FooterContent.adventure_service_desc_ar_4.error')}`),
      adventure_service_title_en_5: Yup.string().required(`${translate('FooterContent.adventure_service_title_en_5.error')}`),
      adventure_service_title_ar_5: Yup.string().required(`${translate('FooterContent.adventure_service_title_ar_5.error')}`),
      adventure_service_desc_en_5: Yup.string().required(`${translate('FooterContent.adventure_service_desc_en_5.error')}`),
      adventure_service_desc_ar_5: Yup.string().required(`${translate('FooterContent.adventure_service_desc_ar_5.error')}`),
      adventure_service_title_en_6: Yup.string().required(`${translate('FooterContent.adventure_service_title_en_6.error')}`),
      adventure_service_title_ar_6: Yup.string().required(`${translate('FooterContent.adventure_service_title_ar_6.error')}`),
      adventure_service_desc_en_6: Yup.string().required(`${translate('FooterContent.adventure_service_desc_en_6.error')}`),
      adventure_service_desc_ar_6: Yup.string().required(`${translate('FooterContent.adventure_service_desc_ar_6.error')}`),
      app_title_en: Yup.string().required(`${translate('FooterContent.app_title_en.error')}`),
      app_title_ar: Yup.string().required(`${translate('FooterContent.app_title_ar.error')}`),
      app_sec_title_en: Yup.string().required(`${translate('FooterContent.app_sec_title_en.error')}`),
      app_sec_title_ar: Yup.string().required(`${translate('FooterContent.app_sec_title_ar.error')}`),
      discount_fir_title_en: Yup.string().required(`${translate('FooterContent.discount_fir_title_en.error')}`),
      discount_fir_title_ar: Yup.string().required(`${translate('FooterContent.discount_fir_title_ar.error')}`),
      discount_sec_title_en: Yup.string().required(`${translate('FooterContent.discount_sec_title_en.error')}`),
      discount_sec_title_ar: Yup.string().required(`${translate('FooterContent.discount_sec_title_ar.error')}`),
      discount_btn_title_en: Yup.string().required(`${translate('FooterContent.discount_btn_title_en.error')}`),
      discount_btn_title_ar: Yup.string().required(`${translate('FooterContent.discount_btn_title_ar.error')}`),
      discount_percentage_en: Yup.string().required(`${translate('FooterContent.discount_percentage_en.error')}`),
      discount_percentage_ar: Yup.string().required(`${translate('FooterContent.discount_percentage_ar.error')}`),
      discount_percentage_title_en: Yup.string().required(`${translate('FooterContent.discount_percentage_title_en.error')}`),
      discount_percentage_title_ar: Yup.string().required(`${translate('FooterContent.discount_percentage_title_ar.error')}`),
      email: Yup.string().email(`${translate('FooterContent.email.error')}`).required(`${translate('FooterContent.email.error')}`),
      phone: Yup.string().required(`${translate('FooterContent.phone.error')}`),
      facebook: Yup.string().url(`${translate('FooterContent.facebook.error')}`).required(`${translate('FooterContent.facebook.error')}`),
      x: Yup.string().url(`${translate('FooterContent.x.error')}`).required(`${translate('FooterContent.x.error')}`),
      instgram: Yup.string().url(`${translate('FooterContent.instgram.error')}`).required(`${translate('FooterContent.instgram.error')}`),
      twitter: Yup.string().url(`${translate('FooterContent.twitter.error')}`).required(`${translate('FooterContent.twitter.error')}`),
      youtube: Yup.string().url(`${translate('FooterContent.youtube.error')}`).required(`${translate('FooterContent.youtube.error')}`),
      adventure_photo: Yup.object().shape({
        id: Yup.string().required(`${translate('FooterContent.adventure_photo.error')}`),
      }),
      banner_photo_for_app: Yup.object().shape({
        id: Yup.string().required(`${translate('FooterContent.banner_photo_for_app.error')}`),
      }),
      discount_photo: Yup.object().shape({
        id: Yup.string().required(`${translate('FooterContent.discount_photo.error')}`),
      }),
      logo: Yup.object().shape({
        id: Yup.string().required(`${translate('FooterContent.logo.error')}`),
      }),
    });
    
    

    const [defaultValues, setDefaultValues] = useState({
     
      adventure_title_en: "Feel Real Adventure and Very Close to Nature",
      adventure_title_ar: "اشعر بالمغامرة الحقيقية وقريب جدًا من الطبيعة",
      adventure_service_title_en_1: "Tent Camping",
      adventure_service_title_ar_1: "التخييم بالخيام",
      adventure_service_desc_en_1: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteradution in some form by injected humour, some form",
      adventure_service_desc_ar_1: "هناك العديد من النصوص المختلفة من لوريم إيبسوم المتاحة، ولكن معظمها تم تغييره بنوع من الفكاهة المضافة.",
      adventure_service_title_en_2: "Adventure Travel",
      adventure_service_title_ar_2: "سفر المغامرات",
      adventure_service_desc_en_2: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteradution in some form by injected humour, some form",
      adventure_service_desc_ar_2: "هناك العديد من النصوص المختلفة من لوريم إيبسوم المتاحة، ولكن معظمها تم تغييره بنوع من الفكاهة المضافة.",
      adventure_service_title_en_3: "Mountain Biking",
      adventure_service_title_ar_3: "ركوب الدراجات الجبلية",
      adventure_service_desc_en_3: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteradution in some form by injected humour, some form",
      adventure_service_desc_ar_3: "هناك العديد من النصوص المختلفة من لوريم إيبسوم المتاحة، ولكن معظمها تم تغييره بنوع من الفكاهة المضافة.",
      adventure_service_title_en_4: "Discovery World",
      adventure_service_title_ar_4: "عالم الاكتشاف",
      adventure_service_desc_en_4: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteradution in some form by injected humour, some form",
      adventure_service_desc_ar_4: "هناك العديد من النصوص المختلفة من لوريم إيبسوم المتاحة، ولكن معظمها تم تغييره بنوع من الفكاهة المضافة.",
      adventure_service_title_en_5: "Fishing & Swimming",
      adventure_service_title_ar_5: "الصيد والسباحة",
      adventure_service_desc_en_5: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteradution in some form by injected humour, some form",
      adventure_service_desc_ar_5: "هناك العديد من النصوص المختلفة من لوريم إيبسوم المتاحة، ولكن معظمها تم تغييره بنوع من الفكاهة المضافة.",
      adventure_service_title_en_6: "Paragliding Tours",
      adventure_service_title_ar_6: "جولات الطيران المظلي",
      adventure_service_desc_en_6: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteradution in some form by injected humour, some form",
      adventure_service_desc_ar_6: "هناك العديد من النصوص المختلفة من لوريم إيبسوم المتاحة، ولكن معظمها تم تغييره بنوع من الفكاهة المضافة.",
      app_title_en: "The ultimate tool for all your travel needs!",
      app_title_ar: "الأداة المثالية لجميع احتياجاتك في السفر!",
      app_sec_title_en: "The app is now available! Download now and discover new destination and activities with ease.",
      app_sec_title_ar: "التطبيق متاح الآن! قم بالتنزيل الآن واكتشف وجهات وأنشطة جديدة بسهولة.",
      discount_fir_title_en: "Special Offer For You",
      discount_fir_title_ar: "عرض خاص لك",
      discount_sec_title_en: " Start your Journey with a Single Click",
      discount_sec_title_ar: "ابدأ رحلتك بنقرة واحدة",
      discount_btn_title_en: "Start Booking",
      discount_btn_title_ar: "ابدأ الحجز",
      discount_percentage_ar: "50%",
      discount_percentage_en: "50%",
      discount_percentage_title_ar: "خصم",
      discount_percentage_title_en: "Discount",
      email: "support@myapp.com",
      phone: "1234567890",
      facebook: "https://facebook.com/myapp",
      x: "https://x.com/myapp",
      instgram: "https://instagram.com/myapp",
      twitter: "https://twitter.com/myapp",
      youtube: "https://youtube.com/myapp",
      adventure_photo: {
        id: "9b3b4b81-c3b2-474d-9f2d-37abf71e3624",
    
      },
      banner_photo_for_app: {
        id: "85c74dd6-5641-4306-a394-60b4979bb362"

   
      },
      discount_photo: {
        id: "1025463d-5242-4f76-a9dc-b562b109e743"
      
      },
      logo: {
        id: "154626b4-4782-4fa0-8619-47e78b47b0a6",
     
      },
    });
    

useEffect(() => {
  if (dataLoaded && FooterContentsData) {
    setDefaultValues((prevValues) => ({
      ...prevValues,
      adventure_title_en: FooterContentsData.adventure_title_en || prevValues.adventure_title_en,
      adventure_title_ar: FooterContentsData.adventure_title_ar || prevValues.adventure_title_ar,
      adventure_service_title_en_1: FooterContentsData.adventure_service_title_en_1 || prevValues.adventure_service_title_en_1,
      adventure_service_title_ar_1: FooterContentsData.adventure_service_title_ar_1 || prevValues.adventure_service_title_ar_1,
      adventure_service_desc_en_1: FooterContentsData.adventure_service_desc_en_1 || prevValues.adventure_service_desc_en_1,
      adventure_service_desc_ar_1: FooterContentsData.adventure_service_desc_ar_1 || prevValues.adventure_service_desc_ar_1,
      adventure_service_title_en_2: FooterContentsData.adventure_service_title_en_2 || prevValues.adventure_service_title_en_2,
      adventure_service_title_ar_2: FooterContentsData.adventure_service_title_ar_2 || prevValues.adventure_service_title_ar_2,
      adventure_service_desc_en_2: FooterContentsData.adventure_service_desc_en_2 || prevValues.adventure_service_desc_en_2,
      adventure_service_desc_ar_2: FooterContentsData.adventure_service_desc_ar_2 || prevValues.adventure_service_desc_ar_2,
      app_title_en: FooterContentsData.app_title_en || prevValues.app_title_en,
      app_title_ar: FooterContentsData.app_title_ar || prevValues.app_title_ar,
      app_sec_title_en: FooterContentsData.app_sec_title_en || prevValues.app_sec_title_en,
      app_sec_title_ar: FooterContentsData.app_sec_title_ar || prevValues.app_sec_title_ar,
      discount_fir_title_en: FooterContentsData.discount_fir_title_en || prevValues.discount_fir_title_en,
      discount_fir_title_ar: FooterContentsData.discount_fir_title_ar || prevValues.discount_fir_title_ar,
      discount_sec_title_en: FooterContentsData.discount_sec_title_en || prevValues.discount_sec_title_en,
      discount_sec_title_ar: FooterContentsData.discount_sec_title_ar || prevValues.discount_sec_title_ar,
      discount_btn_title_en: FooterContentsData.discount_btn_title_en || prevValues.discount_btn_title_en,
      discount_btn_title_ar: FooterContentsData.discount_btn_title_ar || prevValues.discount_btn_title_ar,
      discount_percentage_en: FooterContentsData.discount_percentage_en || prevValues.discount_percentage_en,
      discount_percentage_ar: FooterContentsData.discount_percentage_ar || prevValues.discount_percentage_ar,
      discount_percentage_title_en: FooterContentsData.discount_percentage_title_en || prevValues.discount_percentage_title_en,
      discount_percentage_title_ar: FooterContentsData.discount_percentage_title_ar || prevValues.discount_percentage_title_ar,
      email: FooterContentsData?.email || prevValues.email,
      phone: FooterContentsData?.phone || prevValues.phone,
      facebook: FooterContentsData?.facebook || prevValues.facebook,
      x: FooterContentsData?.x || prevValues.x,
      instgram: FooterContentsData?.instgram || prevValues.instgram,
      twitter: FooterContentsData?.twitter || prevValues.twitter,
      youtube: FooterContentsData?.youtube || prevValues.youtube,
      adventure_photo: {
        id: FooterContentsData?.adventure_photo?.id || prevValues.adventure_photo.id,
      },
      banner_photo_for_app: {
        id: FooterContentsData?.banner_photo_for_app?.id || prevValues.banner_photo_for_app.id,
      },
      discount_photo: {
        id: FooterContentsData?.discount_photo?.id || prevValues.discount_photo.id,
      },
      logo: {
        id: FooterContentsData?.logo?.id || prevValues.logo.id,
      },
    }));
  }
}, [FooterContentsData, dataLoaded]);


const onSubmit = async (formData) => {
  try {
   
    const updatedFooterContent = {
      id: FooterContentsData?.id,
      adventure_title_en: formData.adventure_title_en || FooterContentsData?.adventure_title_en,
      adventure_title_ar: formData.adventure_title_ar || FooterContentsData?.adventure_title_ar,
      adventure_service_title_en_1: formData.adventure_service_title_en_1 || FooterContentsData?.adventure_service_title_en_1,
      adventure_service_title_ar_1: formData.adventure_service_title_ar_1 || FooterContentsData?.adventure_service_title_ar_1,
      adventure_service_desc_en_1: formData.adventure_service_desc_en_1 || FooterContentsData?.adventure_service_desc_en_1,
      adventure_service_desc_ar_1: formData.adventure_service_desc_ar_1 || FooterContentsData?.adventure_service_desc_ar_1,
      adventure_service_title_en_2: formData.adventure_service_title_en_2 || FooterContentsData?.adventure_service_title_en_2,
      adventure_service_title_ar_2: formData.adventure_service_title_ar_2 || FooterContentsData?.adventure_service_title_ar_2,
      adventure_service_desc_en_2: formData.adventure_service_desc_en_2 || FooterContentsData?.adventure_service_desc_en_2,
      adventure_service_desc_ar_2: formData.adventure_service_desc_ar_2 || FooterContentsData?.adventure_service_desc_ar_2,
      adventure_service_title_en_3: formData.adventure_service_title_en_3 || FooterContentsData?.adventure_service_title_en_3,
      adventure_service_title_ar_3: formData.adventure_service_title_ar_3 || FooterContentsData?.adventure_service_title_ar_3,
      adventure_service_desc_en_3: formData.adventure_service_desc_en_3 || FooterContentsData?.adventure_service_desc_en_3,
      adventure_service_desc_ar_3: formData.adventure_service_desc_ar_3 || FooterContentsData?.adventure_service_desc_ar_3,
      adventure_service_title_en_4: formData.adventure_service_title_en_4 || FooterContentsData?.adventure_service_title_en_4,
      adventure_service_title_ar_4: formData.adventure_service_title_ar_4 || FooterContentsData?.adventure_service_title_ar_4,
      adventure_service_desc_en_4: formData.adventure_service_desc_en_4 || FooterContentsData?.adventure_service_desc_en_4,
      adventure_service_desc_ar_4: formData.adventure_service_desc_ar_4 || FooterContentsData?.adventure_service_desc_ar_4,
      adventure_service_title_en_5: formData.adventure_service_title_en_5 || FooterContentsData?.adventure_service_title_en_5,
      adventure_service_title_ar_5: formData.adventure_service_title_ar_5 || FooterContentsData?.adventure_service_title_ar_5,
      adventure_service_desc_en_5: formData.adventure_service_desc_en_5 || FooterContentsData?.adventure_service_desc_en_5,
      adventure_service_desc_ar_5: formData.adventure_service_desc_ar_5 || FooterContentsData?.adventure_service_desc_ar_5,
      adventure_service_title_en_6: formData.adventure_service_title_en_6 || FooterContentsData?.adventure_service_title_en_6,
      adventure_service_title_ar_6: formData.adventure_service_title_ar_6 || FooterContentsData?.adventure_service_title_ar_6,
      adventure_service_desc_en_6: formData.adventure_service_desc_en_6 || FooterContentsData?.adventure_service_desc_en_6,
      adventure_service_desc_ar_6: formData.adventure_service_desc_ar_6 || FooterContentsData?.adventure_service_desc_ar_6,
      app_title_en: formData.app_title_en || FooterContentsData?.app_title_en,
      app_title_ar: formData.app_title_ar || FooterContentsData?.app_title_ar,
      app_sec_title_en: formData.app_sec_title_en || FooterContentsData?.app_sec_title_en,
      app_sec_title_ar: formData.app_sec_title_ar || FooterContentsData?.app_sec_title_ar,
      discount_fir_title_en: formData.discount_fir_title_en || FooterContentsData?.discount_fir_title_en,
      discount_fir_title_ar: formData.discount_fir_title_ar || FooterContentsData?.discount_fir_title_ar,
      discount_sec_title_en: formData.discount_sec_title_en || FooterContentsData?.discount_sec_title_en,
      discount_sec_title_ar: formData.discount_sec_title_ar || FooterContentsData?.discount_sec_title_ar,
      discount_btn_title_en: formData.discount_btn_title_en || FooterContentsData?.discount_btn_title_en,
      discount_btn_title_ar: formData.discount_btn_title_ar || FooterContentsData?.discount_btn_title_ar,
      discount_percentage_ar: formData.discount_percentage_ar || FooterContentsData?.discount_percentage_ar,
      discount_percentage_en: formData.discount_percentage_en || FooterContentsData?.discount_percentage_en,
      discount_percentage_title_ar: formData.discount_percentage_title_ar || FooterContentsData?.discount_percentage_title_ar,
      discount_percentage_title_en: formData.discount_percentage_title_en || FooterContentsData?.discount_percentage_title_en,
      email: formData.email || FooterContentsData?.email,
      phone: formData.phone || FooterContentsData?.phone,
      facebook: formData.facebook || FooterContentsData?.facebook,
      x: formData.x || FooterContentsData?.x,
      instgram: formData.instgram || FooterContentsData?.instgram,
      twitter: formData.twitter || FooterContentsData?.twitter,
      youtube: formData.youtube || FooterContentsData?.youtube,
      adventure_photo: {
        id: formData.adventure_photo?.id || FooterContentsData?.adventure_photo?.id,
      },
      banner_photo_for_app: {
        id: formData.banner_photo_for_app?.id || FooterContentsData?.banner_photo_for_app?.id,
      },
      discount_photo: {
        id: formData.discount_photo?.id || FooterContentsData?.discount_photo?.id,
      },
      logo: {
        id: formData.logo?.id || FooterContentsData?.logo?.id,
      },
    };
    
    
      updateFooterContent(updatedFooterContent);
      enqueueSnackbar(`${translate('editSuccess')}`, { variant: 'success' });
    
    // navigate(PATH_DASHBOARD.home);
  } catch (error) {
    enqueueSnackbar(translate('FooterContent.error'), { variant: 'error' });
  }
};

const [file, setFile] = useState(null);
const [fileId, setFileId] = useState(null);
const methods = useForm({
  resolver: yupResolver(NewFooterContentSchema),
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
          case 'adventure_photo':
            return {
              ...prevState,
              adventure_photo: { id: uploadedFile.id, path: uploadedFile.path },
            };
          case 'banner_photo_for_app':
            return {
              ...prevState,
              banner_photo_for_app: { id: uploadedFile.id, path: uploadedFile.path },
            };
          case 'discount_photo':
            return {
              ...prevState,
              discount_photo: { id: uploadedFile.id, path: uploadedFile.path },
            };
          case 'logo':
            return {
              ...prevState,
              logo: { id: uploadedFile.id, path: uploadedFile.path },
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
    defaultValues,NewFooterContentSchema,FooterContentsData,onSubmit,onUpload,isLoading,handleDrop,uploadedFileDetails
  };
}
