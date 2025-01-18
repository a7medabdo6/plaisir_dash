// useBlogFormHelpers.js
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSingleTrip from 'src/hooks/Trips/useSingleTrip';
import useUpdateTripMutation from 'src/hooks/Trips/useUpdateTripsMutation';
import useUploadMutation from 'src/hooks/useUploadMutation';
import { useLocales } from 'src/locales';
import * as Yup from 'yup';



export function useStepHandlerTrips(currentTrips) {
    const { translate } = useLocales();
    const [dataLoaded, setDataLoaded] = useState(false);
    const { data: TripssData, isError } = useSingleTrip();
    const { mutateAsync: updateTrips, isLoading: isUpdating } = useUpdateTripMutation();
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
      if (TripssData) {
        setDataLoaded(true); // تعيين أن البيانات قد تم تحميلها
      }
    }, [TripssData]);
    const NewTripsSchema = Yup.object().shape({
      name_en: Yup.string().required(`${translate('products.placeholders.name_en')}`),
      name_ar: Yup.string().required(`${translate('products.placeholders.name_ar')}`),
      desc_en: Yup.string().required(`${translate('products.placeholders.desc_en')}`),
      desc_ar: Yup.string().required(`${translate('products.placeholders.desc_ar')}`),
      working_hours_en: Yup.string().required(`${translate('products.placeholders.working_hours_en')}`),
      working_hours_ar: Yup.string().required(`${translate('products.placeholders.working_hours_ar')}`),
      location_en: Yup.string().required(`${translate('products.placeholders.location_en')}`),
      location_ar: Yup.string().required(`${translate('products.placeholders.location_ar')}`),
      map: Yup.string().required(`${translate('products.placeholders.map')}`),
      policy_en: Yup.string().required(`${translate('products.placeholders.policy_en')}`),
      policy_ar: Yup.string().required(`${translate('products.placeholders.policy_ar')}`),
      terms_en: Yup.string().required(`${translate('products.placeholders.terms_en')}`),
      terms_ar: Yup.string().required(`${translate('products.placeholders.terms_ar')}`),
      cancellation_policy_en: Yup.string().required(`${translate('products.placeholders.cancellation_policy_en')}`),
      cancellation_policy_ar: Yup.string().required(`${translate('products.placeholders.cancellation_policy_ar')}`),
      price_per_night: Yup.number().moreThan(0, `${translate('products.placeholders.price_per_night')}`),
      photo: Yup.object().shape({
        id: Yup.string().required(`${translate('products.placeholders.photo_id')}`),
      }),
      categories: Yup.array().min(1, `${translate('products.placeholders.categories')}`),
      features: Yup.array().min(1, `${translate('products.placeholders.features')}`),
      user_id: Yup.string().required(`${translate('products.placeholders.user_id')}`),
      is_child_allowed: Yup.boolean().required(),
      most_popular: Yup.boolean().required(),
      price_for_each_child: Yup.number().required(),
      start_date: Yup.string().required(),
      end_date: Yup.string().required(),
      min_age_allowed: Yup.number().required(),
      is_free: Yup.boolean().required(),
      is_new: Yup.boolean().required(),
      is_Quantitive: Yup.boolean().required(),
      tickets_num: Yup.number().required(),
      company: Yup.object().shape({
        id: Yup.number().required(),
      }),
    });
    


    
    

    const defaultValues = useMemo(
      () => ({
        name_en: currentTrips?.name_en || '',
        name_ar: currentTrips?.name_ar || '',
        photo: currentTrips?.photo || { id: '' },
        categories: currentTrips?.categories || [],
        features: currentTrips?.features || [],
        price_per_night: currentTrips?.price_per_night || 0,
        map: currentTrips?.map || '',
    
        desc_en: currentTrips?.desc_en || '',
        desc_ar: currentTrips?.desc_ar || '',
        working_hours_en: currentTrips?.working_hours_en || '',
        working_hours_ar: currentTrips?.working_hours_ar || '',
        location_en: currentTrips?.location_en || '',
        location_ar: currentTrips?.location_ar || '',
        policy_en: currentTrips?.policy_en || '',
        policy_ar: currentTrips?.policy_ar || '',
        terms_en: currentTrips?.terms_en || '',
        terms_ar: currentTrips?.terms_ar || '',
        cancellation_policy_en: currentTrips?.cancellation_policy_en || '',
        cancellation_policy_ar: currentTrips?.cancellation_policy_ar || '',
        
        user_id: currentTrips?.user_id || '',
    
        // الحقول الجديدة
        is_child_allowed: currentTrips?.is_child_allowed || false,
        most_popular: currentTrips?.most_popular || false,
        price_for_each_child: currentTrips?.price_for_each_child || 0,
        start_date: currentTrips?.start_date || '',
        end_date: currentTrips?.end_date || '',
        min_age_allowed: currentTrips?.min_age_allowed || 0,
        is_free: currentTrips?.is_free || false,
        is_new: currentTrips?.is_new || false,
        is_Quantitive: currentTrips?.is_Quantitive || false,
        tickets_num: currentTrips?.tickets_num || 0,
        company: currentTrips?.company || { id: '' },
      }),
      [currentTrips,TripssData, dataLoaded]
    );
    
    



const onSubmit = async (formData) => {
  try {
   
    const updatedTrips = {
      id: TripssData?.id,
      adventure_title_en: formData.adventure_title_en || TripssData?.adventure_title_en,
      adventure_title_ar: formData.adventure_title_ar || TripssData?.adventure_title_ar,
      adventure_service_title_en_1: formData.adventure_service_title_en_1 || TripssData?.adventure_service_title_en_1,
      adventure_service_title_ar_1: formData.adventure_service_title_ar_1 || TripssData?.adventure_service_title_ar_1,
      adventure_service_desc_en_1: formData.adventure_service_desc_en_1 || TripssData?.adventure_service_desc_en_1,
      adventure_service_desc_ar_1: formData.adventure_service_desc_ar_1 || TripssData?.adventure_service_desc_ar_1,
      adventure_service_title_en_2: formData.adventure_service_title_en_2 || TripssData?.adventure_service_title_en_2,
      adventure_service_title_ar_2: formData.adventure_service_title_ar_2 || TripssData?.adventure_service_title_ar_2,
      adventure_service_desc_en_2: formData.adventure_service_desc_en_2 || TripssData?.adventure_service_desc_en_2,
      adventure_service_desc_ar_2: formData.adventure_service_desc_ar_2 || TripssData?.adventure_service_desc_ar_2,
      adventure_service_title_en_3: formData.adventure_service_title_en_3 || TripssData?.adventure_service_title_en_3,
      adventure_service_title_ar_3: formData.adventure_service_title_ar_3 || TripssData?.adventure_service_title_ar_3,
      adventure_service_desc_en_3: formData.adventure_service_desc_en_3 || TripssData?.adventure_service_desc_en_3,
      adventure_service_desc_ar_3: formData.adventure_service_desc_ar_3 || TripssData?.adventure_service_desc_ar_3,
      adventure_service_title_en_4: formData.adventure_service_title_en_4 || TripssData?.adventure_service_title_en_4,
      adventure_service_title_ar_4: formData.adventure_service_title_ar_4 || TripssData?.adventure_service_title_ar_4,
      adventure_service_desc_en_4: formData.adventure_service_desc_en_4 || TripssData?.adventure_service_desc_en_4,
      adventure_service_desc_ar_4: formData.adventure_service_desc_ar_4 || TripssData?.adventure_service_desc_ar_4,
      adventure_service_title_en_5: formData.adventure_service_title_en_5 || TripssData?.adventure_service_title_en_5,
      adventure_service_title_ar_5: formData.adventure_service_title_ar_5 || TripssData?.adventure_service_title_ar_5,
      adventure_service_desc_en_5: formData.adventure_service_desc_en_5 || TripssData?.adventure_service_desc_en_5,
      adventure_service_desc_ar_5: formData.adventure_service_desc_ar_5 || TripssData?.adventure_service_desc_ar_5,
      adventure_service_title_en_6: formData.adventure_service_title_en_6 || TripssData?.adventure_service_title_en_6,
      adventure_service_title_ar_6: formData.adventure_service_title_ar_6 || TripssData?.adventure_service_title_ar_6,
      adventure_service_desc_en_6: formData.adventure_service_desc_en_6 || TripssData?.adventure_service_desc_en_6,
      adventure_service_desc_ar_6: formData.adventure_service_desc_ar_6 || TripssData?.adventure_service_desc_ar_6,
      app_title_en: formData.app_title_en || TripssData?.app_title_en,
      app_title_ar: formData.app_title_ar || TripssData?.app_title_ar,
      app_sec_title_en: formData.app_sec_title_en || TripssData?.app_sec_title_en,
      app_sec_title_ar: formData.app_sec_title_ar || TripssData?.app_sec_title_ar,
      discount_fir_title_en: formData.discount_fir_title_en || TripssData?.discount_fir_title_en,
      discount_fir_title_ar: formData.discount_fir_title_ar || TripssData?.discount_fir_title_ar,
      discount_sec_title_en: formData.discount_sec_title_en || TripssData?.discount_sec_title_en,
      discount_sec_title_ar: formData.discount_sec_title_ar || TripssData?.discount_sec_title_ar,
      discount_btn_title_en: formData.discount_btn_title_en || TripssData?.discount_btn_title_en,
      discount_btn_title_ar: formData.discount_btn_title_ar || TripssData?.discount_btn_title_ar,
      discount_percentage_ar: formData.discount_percentage_ar || TripssData?.discount_percentage_ar,
      discount_percentage_en: formData.discount_percentage_en || TripssData?.discount_percentage_en,
      discount_percentage_title_ar: formData.discount_percentage_title_ar || TripssData?.discount_percentage_title_ar,
      discount_percentage_title_en: formData.discount_percentage_title_en || TripssData?.discount_percentage_title_en,
      email: formData.email || TripssData?.email,
      phone: formData.phone || TripssData?.phone,
      facebook: formData.facebook || TripssData?.facebook,
      x: formData.x || TripssData?.x,
      instgram: formData.instgram || TripssData?.instgram,
      twitter: formData.twitter || TripssData?.twitter,
      youtube: formData.youtube || TripssData?.youtube,
      adventure_photo: {
        id: formData.adventure_photo?.id || TripssData?.adventure_photo?.id,
      },
      banner_photo_for_app: {
        id: formData.banner_photo_for_app?.id || TripssData?.banner_photo_for_app?.id,
      },
      discount_photo: {
        id: formData.discount_photo?.id || TripssData?.discount_photo?.id,
      },
      logo: {
        id: formData.logo?.id || TripssData?.logo?.id,
      },
    };
    
    
      updateTrips(updatedTrips);
      enqueueSnackbar(`${translate('editSuccess')}`, { variant: 'success' });
    
    // navigate(PATH_DASHBOARD.home);
  } catch (error) {
    enqueueSnackbar(translate('Trips.error'), { variant: 'error' });
  }
};

const [file, setFile] = useState(null);
const [fileId, setFileId] = useState(null);

const methods = useForm({
  resolver: yupResolver(NewTripsSchema),
  defaultValues: TripssData || {}, 
});
// useEffect(() => {
//   if (TripssData) {
//     methods.reset(defaultValues);
//   }
// }, [TripssData, methods, defaultValues]);
const {
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
const fields = [
  {
    name: 'name_en',
    label: 'Name (English)',
    placeholder: 'Enter name in English',
  },
  {
    name: 'name_ar',
    label: 'Name (Arabic)',
    placeholder: 'Enter name in Arabic',
  },
  {
    name: 'minimum_nights',
    label: 'Minimum Nights',
    placeholder: 'Enter minimum nights',
  },
  {
    name: 'price_per_night',
    label: 'Price Per Night',
    placeholder: 'Enter price per night',
  },

  {
    name: 'start_date',
    label: 'Start Date',
    placeholder: 'Enter start date',
    isDate: true,
  },
  {
    name: 'end_date',
    label: 'End Date',
    placeholder: 'Enter end date',
    isDate: true,
  },
  {
    name: 'desc_en',
    label: 'Description (English)',
    placeholder: `${translate('products.placeholders.desc_en')}`,
    isEditor: true,
  },
  {
    name: 'desc_ar',
    label: 'Description (Arabic)',
    placeholder: 'Enter description in Arabic',
    isEditor: true,
  },
  {
    name: 'photo',
    label: 'Photo',
    placeholder: 'Upload a photo',
    isUpload: true,
  },
  {
    name: 'most_popular',
    label: 'Most Popular',
    placeholder: 'Mark as popular',
    isSwitch: true,
  },
  {
    name: 'is_child_allowed',
    label: 'Is Child Allowed',
    placeholder: 'Allow children',
    isSwitch: true,
  },

  {
    name: 'price_for_each_child',
    label: 'Price For Each Child',
    placeholder: 'Enter price for each child',
  },
  {
    name: 'working_hours_en',
    label: 'Working Hours (English)',
    placeholder: 'Enter working hours in English',
    isEditor: true,
  },
  {
    name: 'working_hours_ar',
    label: 'Working Hours (Arabic)',
    placeholder: 'Enter working hours in Arabic',
    isEditor: true,
  },
  {
    name: 'location_en',
    label: 'Location (English)',
    placeholder: 'Enter location in English',
  },
  {
    name: 'location_ar',
    label: 'Location (Arabic)',
    placeholder: 'Enter location in Arabic',
  },
  {
    name: 'map',
    label: 'Map',
    placeholder: 'Enter map link',
  },
  {
    name: 'policy_en',
    label: 'Policy (English)',
    placeholder: 'Enter policy in English',
    isEditor: true,
  },
  {
    name: 'policy_ar',
    label: 'Policy (Arabic)',
    placeholder: 'Enter policy in Arabic',
    isEditor: true,
  },
  {
    name: 'terms_en',
    label: 'Terms (English)',
    placeholder: 'Enter terms in English',
    isEditor: true,
  },
  {
    name: 'terms_ar',
    label: 'Terms (Arabic)',
    placeholder: 'Enter terms in Arabic',
    isEditor: true,
  },
  {
    name: 'cancellation_policy_en',
    label: 'Cancellation Policy (English)',
    placeholder: 'Enter cancellation policy in English',
    isEditor: true,
  },
  {
    name: 'cancellation_policy_ar',
    label: 'Cancellation Policy (Arabic)',
    placeholder: 'Enter cancellation policy in Arabic',
    isEditor: true,
  },
 

  {
    name: 'user_id',
    label: 'User ID',
    placeholder: 'Enter user ID',
  },


 
  {
    name: 'min_age_allowed',
    label: 'Minimum Age Allowed',
    placeholder: 'Enter minimum age allowed',
  },

  {
    name: 'company_id',
    label: 'Company ID',
    placeholder: 'Enter company ID',
  },
];

const fieldsLeft = [
  {
    name: 'categories',
    label: 'Categories',
    placeholder: 'Select categories',
    isMultiSelect: true,
  },
  {
    name: 'features',
    label: 'Features',
    placeholder: 'Select features',
    isMultiSelect: true,
  },
  {
    name: 'is_free',
    label: 'Is Free',
    placeholder: 'Is this free?',
    isSwitch: true,
  },
  {
    name: 'is_new',
    label: 'Is New',
    placeholder: 'Mark as new',
    isSwitch: true,
  },
  {
    name: 'is_Quantitive',
    label: 'Is Quantitive',
    placeholder: 'Is quantitive?',
    isSwitch: true,
  },
  {
    name: 'tickets_num',
    label: 'Number of Tickets',
    placeholder: 'Enter number of tickets',
  },

];
  return {
    defaultValues,NewTripsSchema,TripssData,onSubmit,onUpload,isLoading,handleDrop,uploadedFileDetails,fields,fieldsLeft
  };
}
