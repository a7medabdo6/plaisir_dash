// useBlogFormHelpers.js
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSingleHomeContent from 'src/hooks/HomeContent/useSingleHomeContent';
import useUpdateHomeContentMutation from 'src/hooks/HomeContent/useUpdateHomeContentMutation';
import useUploadMutation from 'src/hooks/useUploadMutation';
import { useLocales } from 'src/locales';
import * as Yup from 'yup';


export function useStepHandlerHomeContent(currentHomeContent) {
    const { translate } = useLocales();
    const [dataLoaded, setDataLoaded] = useState(false);
    const { data: HomeContentsData, isError } = useSingleHomeContent();
    const { mutate: updateHomeContent, isLoading: isUpdating } = useUpdateHomeContentMutation();
    const { enqueueSnackbar } = useSnackbar();
    const uploadMutation = useUploadMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFileDetails, setUploadedFileDetails] = useState({
      banner_photo: null,
      banner_photo_ar: null,
      know_us_photo: null,
      know_us_photo_ar: null, // Added
      why_choose_photo: null, // Added
      why_choose_photo_ar: null, // Added
      ready_to_travel_photo: null, // Added
      ready_to_travel_sec_photo: null, // Added
      ready_to_travel_third_photo: null, // Added
      ready_to_travel_forth_photo: null, // Added
    });

    useEffect(() => {
      if (HomeContentsData) {
        setDataLoaded(true); // تعيين أن البيانات قد تم تحميلها
      }
    }, [HomeContentsData]);

  const NewHomeContentSchema = Yup.object().shape({
    banner_fir_title_en: Yup.string().required(`${translate('HomeContent.errors.banner_fir_title_en')}`),
    banner_fir_title_ar: Yup.string().required(`${translate('HomeContent.errors.banner_fir_title_ar')}`),
    banner_sec_title_en: Yup.string().required(`${translate('HomeContent.errors.banner_sec_title_en')}`),
    banner_sec_title_ar: Yup.string().required(`${translate('HomeContent.errors.banner_sec_title_ar')}`),
    banner_third_title_en: Yup.string().required(`${translate('HomeContent.errors.banner_third_title_en')}`),
    banner_third_title_ar: Yup.string().required(`${translate('HomeContent.errors.banner_third_title_ar')}`),
    banner_btn_en: Yup.string().required(`${translate('HomeContent.errors.banner_btn_en')}`),
    banner_btn_ar: Yup.string().required(`${translate('HomeContent.errors.banner_btn_ar')}`),
    service_fir_title_en: Yup.string().required(`${translate('HomeContent.errors.service_fir_title_en')}`),
    service_fir_title_ar: Yup.string().required(`${translate('HomeContent.errors.service_fir_title_ar')}`),
    service_fir_sub_title_en: Yup.string().required(`${translate('HomeContent.errors.service_fir_sub_title_en')}`),
    service_fir_sub_title_ar: Yup.string().required(`${translate('HomeContent.errors.service_fir_sub_title_ar')}`),
    service_sec_title_en: Yup.string().required(`${translate('HomeContent.errors.service_sec_title_en')}`),
    service_sec_title_ar: Yup.string().required(`${translate('HomeContent.errors.service_sec_title_ar')}`),
    service_sec_sub_title_en: Yup.string().required(`${translate('HomeContent.errors.service_sec_sub_title_en')}`),
    service_sec_sub_title_ar: Yup.string().required(`${translate('HomeContent.errors.service_sec_sub_title_ar')}`),
    service_third_title_en: Yup.string().required(`${translate('HomeContent.errors.service_third_title_en')}`),
    service_third_title_ar: Yup.string().required(`${translate('HomeContent.errors.service_third_title_ar')}`),
    service_third_sub_title_en: Yup.string().required(`${translate('HomeContent.errors.service_third_sub_title_en')}`),
    service_third_sub_title_ar: Yup.string().required(`${translate('HomeContent.errors.service_third_sub_title_ar')}`),
    service_forth_title_en: Yup.string().required(`${translate('HomeContent.errors.service_forth_title_en')}`),
    service_forth_title_ar: Yup.string().required(`${translate('HomeContent.errors.service_forth_title_ar')}`),
    service_fivth_title_en: Yup.string().required(`${translate('HomeContent.errors.service_fivth_title_en')}`),
    service_fivth_title_ar: Yup.string().required(`${translate('HomeContent.errors.service_fivth_title_ar')}`),
    service_sex_title_en: Yup.string().required(`${translate('HomeContent.errors.service_sex_title_en')}`),
    service_sex_title_ar: Yup.string().required(`${translate('HomeContent.errors.service_sex_title_ar')}`),
    service_seven_title_en: Yup.string().required(`${translate('HomeContent.errors.service_seven_title_en')}`),
    service_seven_title_ar: Yup.string().required(`${translate('HomeContent.errors.service_seven_title_ar')}`),
    know_us_title_en: Yup.string().required(`${translate('HomeContent.errors.know_us_title_en')}`),
    know_us_title_ar: Yup.string().required(`${translate('HomeContent.errors.know_us_title_ar')}`),
    know_us_sub_title_en: Yup.string().required(`${translate('HomeContent.errors.know_us_sub_title_en')}`),
    know_us_sub_title_ar: Yup.string().required(`${translate('HomeContent.errors.know_us_sub_title_ar')}`),
    know_us_sec_title_en: Yup.string().required(`${translate('HomeContent.errors.know_us_sec_title_en')}`),
    know_us_sec_title_ar: Yup.string().required(`${translate('HomeContent.errors.know_us_sec_title_ar')}`),
    know_us_fir_item_en: Yup.string().required(`${translate('HomeContent.errors.know_us_fir_item_en')}`),
    know_us_fir_item_ar: Yup.string().required(`${translate('HomeContent.errors.know_us_fir_item_ar')}`),
    know_us_sec_item_en: Yup.string().required(`${translate('HomeContent.errors.know_us_sec_item_en')}`),
    know_us_sec_item_ar: Yup.string().required(`${translate('HomeContent.errors.know_us_sec_item_ar')}`),
    know_us_third_item_en: Yup.string().required(`${translate('HomeContent.errors.know_us_third_item_en')}`),
    know_us_third_item_ar: Yup.string().required(`${translate('HomeContent.errors.know_us_third_item_ar')}`),
    know_us_left_title_en: Yup.string().required(`${translate('HomeContent.errors.know_us_left_title_en')}`),
    know_us_left_title_ar: Yup.string().required(`${translate('HomeContent.errors.know_us_left_title_ar')}`),
    why_choose_title_en: Yup.string().required(`${translate('HomeContent.errors.why_choose_title_en')}`),
    why_choose_title_ar: Yup.string().required(`${translate('HomeContent.errors.why_choose_title_ar')}`),
    why_choose_left_title_en: Yup.string().required(`${translate('HomeContent.errors.why_choose_left_title_en')}`),
    why_choose_left_title_ar: Yup.string().required(`${translate('HomeContent.errors.why_choose_left_title_ar')}`),
    why_choose_fir_item_en: Yup.string().required(`${translate('HomeContent.errors.why_choose_fir_item_en')}`),
    why_choose_fir_item_ar: Yup.string().required(`${translate('HomeContent.errors.why_choose_fir_item_ar')}`),
    why_choose_sec_item_en: Yup.string().required(`${translate('HomeContent.errors.why_choose_sec_item_en')}`),
    why_choose_sec_item_ar: Yup.string().required(`${translate('HomeContent.errors.why_choose_sec_item_ar')}`),
    banner_photo: Yup.object().nullable().shape({
      id: Yup.string().required(translate('HomeContent.errors.banner_photo'))
    }),
    banner_photo_ar: Yup.object().nullable().shape({
      id: Yup.string().required(translate('HomeContent.errors.banner_photo_ar'))
    }),

    know_us_photo: Yup.object().shape({
      id: Yup.string().required(translate('HomeContent.errors.know_us_photo'))
    }),
    know_us_photo_ar: Yup.object().shape({
      id: Yup.string().required(translate('HomeContent.errors.know_us_photo_ar'))
    }),

    why_choose_photo: Yup.object().shape({
      id: Yup.string().required(translate('HomeContent.errors.why_choose_photo'))
    }),
    why_choose_photo_ar: Yup.object().shape({
      id: Yup.string().required(translate('HomeContent.errors.why_choose_photo_ar'))
    }),

    
    ready_to_travel_title_en: Yup.string().required(translate('HomeContent.errors.ready_to_travel_title_en')),
    ready_to_travel_title_ar: Yup.string().required(translate('HomeContent.errors.ready_to_travel_title_ar')),
    ready_to_travel_sub_title_en: Yup.string().required(translate('HomeContent.errors.ready_to_travel_sub_title_en')),
    ready_to_travel_sub_title_ar: Yup.string().required(translate('HomeContent.errors.ready_to_travel_sub_title_ar')),

    percentage: Yup.string().required(translate('HomeContent.errors.percentage')),

    ready_to_travel_photo: Yup.object().shape({
      id: Yup.string().required(translate('HomeContent.errors.ready_to_travel_photo'))
    }),
    ready_to_travel_sec_photo: Yup.object().shape({
      id: Yup.string().required(translate('HomeContent.errors.ready_to_travel_sec_photo'))
    }),
    ready_to_travel_third_photo: Yup.object().shape({
      id: Yup.string().required(translate('HomeContent.errors.ready_to_travel_third_photo'))
    }),
    ready_to_travel_forth_photo: Yup.object().shape({
      id: Yup.string().required(translate('HomeContent.errors.ready_to_travel_forth_photo'))
    }),
  });


const [defaultValues, setDefaultValues] = useState({
  banner_fir_title_en: 'Welcome to Our Application',
  banner_fir_title_ar: 'مرحباً بكم في تطبيقنا',
  banner_sec_title_en: 'Explore Our Services',
  banner_sec_title_ar: 'استكشف خدماتنا',
  banner_third_title_en: 'Join Us Today',
  banner_third_title_ar: 'انضم إلينا اليوم',
  banner_btn_en: 'Get Started',
  banner_btn_ar: '',
  service_fir_title_en: 'Quality Services',
  service_fir_title_ar: 'خدمات عالية الجودة',
  service_fir_sub_title_en: 'We offer top-notch services to our clients.',
  service_fir_sub_title_ar: 'نحن نقدم خدمات من الدرجة الأولى لعملائنا.',
  service_sec_title_en: 'Web Development',
  service_sec_title_ar: 'تطوير المواقع',
  service_sec_sub_title_en: 'Build your dream website with us.',
  service_sec_sub_title_ar: 'بناء موقعك الإلكتروني المثالي معنا.',
  service_third_title_en: 'Mobile Applications',
  service_third_title_ar: 'تطبيقات الهواتف المحمولة',
  service_third_sub_title_en: 'Create your mobile apps today.',
  service_third_sub_title_ar: 'أنشئ تطبيقك اليوم.',
  service_forth_title_en: 'Digital Marketing',
  service_forth_title_ar: 'التسويق الرقمي',
  service_fivth_title_en: 'Graphic Design',
  service_fivth_title_ar: 'تصميم الجرافيك',
  service_sex_title_en: 'SEO Optimization',
  service_sex_title_ar: 'تحسين محركات البحث',
  service_seven_title_en: 'Consulting Services',
  service_seven_title_ar: 'خدمات الاستشارات',
  know_us_title_en: 'Get to Know Us',
  know_us_title_ar: 'تعرف علينا',
  know_us_sub_title_en: 'Learn more about our journey.',
  know_us_sub_title_ar: 'تعرف على المزيد عن رحلتنا.',
  know_us_sec_title_en: 'Our Mission',
  know_us_sec_title_ar: 'مهمتنا',
  know_us_fir_item_en: 'Customer Satisfaction',
  know_us_fir_item_ar: 'رضا العملاء',
  know_us_sec_item_en: 'Innovation',
  know_us_sec_item_ar: 'الابتكار',
  know_us_third_item_en: 'Quality Assurance',
  know_us_third_item_ar: 'ضمان الجودة',
  know_us_left_title_en: 'Our Team',
  know_us_left_title_ar: 'فريقنا',
  why_choose_title_en: 'Why Choose Us?',
  why_choose_title_ar: 'لماذا تختارنا؟',
  why_choose_left_title_en: 'Reliable Service',
  why_choose_left_title_ar: 'خدمة موثوقة',
  why_choose_fir_item_en: 'Experienced Team',
  why_choose_fir_item_ar: 'فريق ذو خبرة',
  why_choose_sec_item_en: 'Affordable Pricing',
  why_choose_sec_item_ar: '',
  banner_photo: {
    id: null, // Default ID
  },
  banner_photo_ar: {
    id: null, // Default ID
  },
  know_us_photo: {
    id: null, // Default ID
  },
  know_us_photo_ar: {
    id: null, // Default ID
  },
  why_choose_photo: {
    id: null, // Default ID
  },
  why_choose_photo_ar: {
    id: null, // Default ID
  },
  ready_to_travel_title_en: 'Ready to Travel?',
  ready_to_travel_title_ar: 'مستعد للسفر؟',
  ready_to_travel_sub_title_en: 'Start your adventure now.',
  ready_to_travel_sub_title_ar: 'ابدأ مغامرتك الآن.',
  ready_to_travel_photo: {
    id: null, // Default ID
  },
  ready_to_travel_sec_photo: {
    id: null, // Default ID
  },
  ready_to_travel_third_photo: {
    id: null, // Default ID
  },
  ready_to_travel_forth_photo: {
    id: null, // Default ID
  },
});

useEffect(() => {
  if (dataLoaded && HomeContentsData) {
    setDefaultValues((prevValues) => ({
      ...prevValues,
      banner_fir_title_en: HomeContentsData.banner_fir_title_en || prevValues.banner_fir_title_en,
      banner_fir_title_ar: HomeContentsData.banner_fir_title_ar || prevValues.banner_fir_title_ar,
      banner_sec_title_en: HomeContentsData.banner_sec_title_en || prevValues.banner_sec_title_en,
      banner_sec_title_ar: HomeContentsData.banner_sec_title_ar || prevValues.banner_sec_title_ar,
      banner_third_title_en: HomeContentsData.banner_third_title_en || prevValues.banner_third_title_en,
      banner_third_title_ar: HomeContentsData.banner_third_title_ar || prevValues.banner_third_title_ar,
      banner_btn_en: HomeContentsData.banner_btn_en || prevValues.banner_btn_en,
      banner_btn_ar: HomeContentsData.banner_btn_ar || prevValues.banner_btn_ar,
      service_fir_title_en: HomeContentsData.service_fir_title_en || prevValues.service_fir_title_en,
      service_fir_title_ar: HomeContentsData.service_fir_title_ar || prevValues.service_fir_title_ar,
      service_fir_sub_title_en: HomeContentsData.service_fir_sub_title_en || prevValues.service_fir_sub_title_en,
      service_fir_sub_title_ar: HomeContentsData.service_fir_sub_title_ar || prevValues.service_fir_sub_title_ar,
      service_sec_title_en: HomeContentsData.service_sec_title_en || prevValues.service_sec_title_en,
      service_sec_title_ar: HomeContentsData.service_sec_title_ar || prevValues.service_sec_title_ar,
      service_sec_sub_title_en: HomeContentsData.service_sec_sub_title_en || prevValues.service_sec_sub_title_en,
      service_sec_sub_title_ar: HomeContentsData.service_sec_sub_title_ar || prevValues.service_sec_sub_title_ar,
      service_third_title_en: HomeContentsData.service_third_title_en || prevValues.service_third_title_en,
      service_third_title_ar: HomeContentsData.service_third_title_ar || prevValues.service_third_title_ar,
      service_third_sub_title_en: HomeContentsData.service_third_sub_title_en || prevValues.service_third_sub_title_en,
      service_third_sub_title_ar: HomeContentsData.service_third_sub_title_ar || prevValues.service_third_sub_title_ar,
      service_forth_title_en: HomeContentsData.service_forth_title_en || prevValues.service_forth_title_en,
      service_forth_title_ar: HomeContentsData.service_forth_title_ar || prevValues.service_forth_title_ar,
      service_fivth_title_en: HomeContentsData.service_fivth_title_en || prevValues.service_fivth_title_en,
      service_fivth_title_ar: HomeContentsData.service_fivth_title_ar || prevValues.service_fivth_title_ar,
      service_sex_title_en: HomeContentsData.service_sex_title_en || prevValues.service_sex_title_en,
      service_sex_title_ar: HomeContentsData.service_sex_title_ar || prevValues.service_sex_title_ar,
      service_seven_title_en: HomeContentsData.service_seven_title_en || prevValues.service_seven_title_en,
      service_seven_title_ar: HomeContentsData.service_seven_title_ar || prevValues.service_seven_title_ar,
      know_us_title_en: HomeContentsData.know_us_title_en || prevValues.know_us_title_en,
      know_us_title_ar: HomeContentsData.know_us_title_ar || prevValues.know_us_title_ar,
      know_us_sub_title_en: HomeContentsData.know_us_sub_title_en || prevValues.know_us_sub_title_en,
      know_us_sub_title_ar: HomeContentsData.know_us_sub_title_ar || prevValues.know_us_sub_title_ar,
      know_us_sec_title_en: HomeContentsData.know_us_sec_title_en || prevValues.know_us_sec_title_en,
      know_us_sec_title_ar: HomeContentsData.know_us_sec_title_ar || prevValues.know_us_sec_title_ar,
      know_us_fir_item_en: HomeContentsData.know_us_fir_item_en || prevValues.know_us_fir_item_en,
      know_us_fir_item_ar: HomeContentsData.know_us_fir_item_ar || prevValues.know_us_fir_item_ar,
      know_us_sec_item_en: HomeContentsData.know_us_sec_item_en || prevValues.know_us_sec_item_en,
      know_us_sec_item_ar: HomeContentsData.know_us_sec_item_ar || prevValues.know_us_sec_item_ar,
      know_us_third_item_en: HomeContentsData.know_us_third_item_en || prevValues.know_us_third_item_en,
      know_us_third_item_ar: HomeContentsData.know_us_third_item_ar || prevValues.know_us_third_item_ar,
      know_us_left_title_en: HomeContentsData.know_us_left_title_en || prevValues.know_us_left_title_en,
      know_us_left_title_ar: HomeContentsData.know_us_left_title_ar || prevValues.know_us_left_title_ar,
      why_choose_title_en: HomeContentsData.why_choose_title_en || prevValues.why_choose_title_en,
      why_choose_title_ar: HomeContentsData.why_choose_title_ar || prevValues.why_choose_title_ar,
      why_choose_left_title_en: HomeContentsData.why_choose_left_title_en || prevValues.why_choose_left_title_en,
      why_choose_left_title_ar: HomeContentsData.why_choose_left_title_ar || prevValues.why_choose_left_title_ar,
      why_choose_fir_item_en: HomeContentsData.why_choose_fir_item_en || prevValues.why_choose_fir_item_en,
      why_choose_fir_item_ar: HomeContentsData.why_choose_fir_item_ar || prevValues.why_choose_fir_item_ar,
      why_choose_sec_item_en: HomeContentsData.why_choose_sec_item_en || prevValues.why_choose_sec_item_en,
      why_choose_sec_item_ar: HomeContentsData.why_choose_sec_item_ar || prevValues.why_choose_sec_item_ar,
      banner_photo: {
        id: HomeContentsData?.banner_photo?.id || prevValues.banner_photo.id,
      },
      banner_photo_ar: {
        id: HomeContentsData?.banner_photo_ar?.id || prevValues.banner_photo_ar.id,
      },
      know_us_photo: {
        id: HomeContentsData?.know_us_photo?.id || prevValues.know_us_photo.id,
      },
      know_us_photo_ar: {
        id: HomeContentsData?.know_us_photo_ar?.id || prevValues.know_us_photo_ar.id,
      },
      why_choose_photo: {
        id: HomeContentsData?.why_choose_photo?.id || prevValues.why_choose_photo.id,
      },
      why_choose_photo_ar: {
        id: HomeContentsData?.why_choose_photo_ar?.id || prevValues.why_choose_photo_ar.id,
      },
      ready_to_travel_title_en: HomeContentsData?.ready_to_travel_title_en || prevValues.ready_to_travel_title_en,
      ready_to_travel_title_ar: HomeContentsData?.ready_to_travel_title_ar || prevValues.ready_to_travel_title_ar,
      ready_to_travel_sub_title_en: HomeContentsData?.ready_to_travel_sub_title_en || prevValues.ready_to_travel_sub_title_en,
      ready_to_travel_sub_title_ar: HomeContentsData?.ready_to_travel_sub_title_ar || prevValues.ready_to_travel_sub_title_ar,
      ready_to_travel_photo: {
        id: HomeContentsData?.ready_to_travel_photo?.id || prevValues.ready_to_travel_photo.id,
      },
      ready_to_travel_sec_photo: {
        id: HomeContentsData?.ready_to_travel_sec_photo?.id || prevValues.ready_to_travel_sec_photo.id,
      },
      ready_to_travel_third_photo: {
        id: HomeContentsData?.ready_to_travel_third_photo?.id || prevValues.ready_to_travel_third_photo.id,
      },
      ready_to_travel_forth_photo: {
        id: HomeContentsData?.ready_to_travel_forth_photo?.id || prevValues.ready_to_travel_forth_photo.id,
      },
    }));
  }
}, [HomeContentsData, dataLoaded]);


const onSubmit = async (formData) => {
  try {
   
    const updatedHomeContent = {
      // id: HomeContentsData?.id,
      banner_fir_title_en: formData.banner_fir_title_en || HomeContentsData?.banner_fir_title_en,
      banner_fir_title_ar: formData.banner_fir_title_ar || HomeContentsData?.banner_fir_title_ar,
      banner_sec_title_en: formData.banner_sec_title_en || HomeContentsData?.banner_sec_title_en,
      banner_sec_title_ar: formData.banner_sec_title_ar || HomeContentsData?.banner_sec_title_ar,
      banner_third_title_en: formData.banner_third_title_en || HomeContentsData?.banner_third_title_en,
      banner_third_title_ar: formData.banner_third_title_ar || HomeContentsData?.banner_third_title_ar,
      banner_btn_en: formData.banner_btn_en || HomeContentsData?.banner_btn_en,
      banner_btn_ar: formData.banner_btn_ar || HomeContentsData?.banner_btn_ar,
      service_fir_title_en: formData.service_fir_title_en || HomeContentsData?.service_fir_title_en,
      service_fir_title_ar: formData.service_fir_title_ar || HomeContentsData?.service_fir_title_ar,
      service_fir_sub_title_en: formData.service_fir_sub_title_en || HomeContentsData?.service_fir_sub_title_en,
      service_fir_sub_title_ar: formData.service_fir_sub_title_ar || HomeContentsData?.service_fir_sub_title_ar,
      service_sec_title_en: formData.service_sec_title_en || HomeContentsData?.service_sec_title_en,
      service_sec_title_ar: formData.service_sec_title_ar || HomeContentsData?.service_sec_title_ar,
      service_sec_sub_title_en: formData.service_sec_sub_title_en || HomeContentsData?.service_sec_sub_title_en,
      service_sec_sub_title_ar: formData.service_sec_sub_title_ar || HomeContentsData?.service_sec_sub_title_ar,
      service_third_title_en: formData.service_third_title_en || HomeContentsData?.service_third_title_en,
      service_third_title_ar: formData.service_third_title_ar || HomeContentsData?.service_third_title_ar,
      service_third_sub_title_en: formData.service_third_sub_title_en || HomeContentsData?.service_third_sub_title_en,
      service_third_sub_title_ar: formData.service_third_sub_title_ar || HomeContentsData?.service_third_sub_title_ar,
      service_forth_title_en: formData.service_forth_title_en || HomeContentsData?.service_forth_title_en,
      service_forth_title_ar: formData.service_forth_title_ar || HomeContentsData?.service_forth_title_ar,
      service_fivth_title_en: formData.service_fivth_title_en || HomeContentsData?.service_fivth_title_en,
      service_fivth_title_ar: formData.service_fivth_title_ar || HomeContentsData?.service_fivth_title_ar,
      service_sex_title_en: formData.service_sex_title_en || HomeContentsData?.service_sex_title_en,
      service_sex_title_ar: formData.service_sex_title_ar || HomeContentsData?.service_sex_title_ar,
      service_seven_title_en: formData.service_seven_title_en || HomeContentsData?.service_seven_title_en,
      service_seven_title_ar: formData.service_seven_title_ar || HomeContentsData?.service_seven_title_ar,
      know_us_title_en: formData.know_us_title_en || HomeContentsData?.know_us_title_en,
      know_us_title_ar: formData.know_us_title_ar || HomeContentsData?.know_us_title_ar,
      know_us_sub_title_en: formData.know_us_sub_title_en || HomeContentsData?.know_us_sub_title_en,
      know_us_sub_title_ar: formData.know_us_sub_title_ar || HomeContentsData?.know_us_sub_title_ar,
      know_us_sec_title_en: formData.know_us_sec_title_en || HomeContentsData?.know_us_sec_title_en,
      know_us_sec_title_ar: formData.know_us_sec_title_ar || HomeContentsData?.know_us_sec_title_ar,
      know_us_fir_item_en: formData.know_us_fir_item_en || HomeContentsData?.know_us_fir_item_en,
      know_us_fir_item_ar: formData.know_us_fir_item_ar || HomeContentsData?.know_us_fir_item_ar,
      know_us_sec_item_en: formData.know_us_sec_item_en || HomeContentsData?.know_us_sec_item_en,
      know_us_sec_item_ar: formData.know_us_sec_item_ar || HomeContentsData?.know_us_sec_item_ar,
      know_us_third_item_en: formData.know_us_third_item_en || HomeContentsData?.know_us_third_item_en,
      know_us_third_item_ar: formData.know_us_third_item_ar || HomeContentsData?.know_us_third_item_ar,
      know_us_left_title_en: formData.know_us_left_title_en || HomeContentsData?.know_us_left_title_en,
      know_us_left_title_ar: formData.know_us_left_title_ar || HomeContentsData?.know_us_left_title_ar,
      why_choose_title_en: formData.why_choose_title_en || HomeContentsData?.why_choose_title_en,
      why_choose_title_ar: formData.why_choose_title_ar || HomeContentsData?.why_choose_title_ar,
      why_choose_left_title_en: formData.why_choose_left_title_en || HomeContentsData?.why_choose_left_title_en,
      why_choose_left_title_ar: formData.why_choose_left_title_ar || HomeContentsData?.why_choose_left_title_ar,
      why_choose_fir_item_en: formData.why_choose_fir_item_en || HomeContentsData?.why_choose_fir_item_en,
      why_choose_fir_item_ar: formData.why_choose_fir_item_ar || HomeContentsData?.why_choose_fir_item_ar,
      why_choose_sec_item_en: formData.why_choose_sec_item_en || HomeContentsData?.why_choose_sec_item_en,
      why_choose_sec_item_ar: formData.why_choose_sec_item_ar || HomeContentsData?.why_choose_sec_item_ar,
      banner_photo: {
        id: uploadedFileDetails.banner_photo?.id || HomeContentsData?.banner_photo?.id,
      },
      banner_photo_ar: {
        id: uploadedFileDetails.banner_photo_ar?.id || HomeContentsData?.banner_photo_ar?.id,
      },
      know_us_photo: {
        id: uploadedFileDetails.know_us_photo?.id || HomeContentsData?.know_us_photo?.id,
      },
      know_us_photo_ar: {
        id: uploadedFileDetails.know_us_photo_ar?.id || HomeContentsData?.know_us_photo_ar?.id,
      },
      why_choose_photo: {
        id: uploadedFileDetails.why_choose_photo?.id || HomeContentsData?.why_choose_photo?.id,
      },
      why_choose_photo_ar: {
        id: uploadedFileDetails.why_choose_photo_ar?.id || HomeContentsData?.why_choose_photo_ar?.id,
      },
      ready_to_travel_title_en: formData.ready_to_travel_title_en || HomeContentsData?.ready_to_travel_title_en,
      ready_to_travel_title_ar: formData.ready_to_travel_title_ar || HomeContentsData?.ready_to_travel_title_ar,
      ready_to_travel_sub_title_en: formData.ready_to_travel_sub_title_en || HomeContentsData?.ready_to_travel_sub_title_en,
      ready_to_travel_sub_title_ar: formData.ready_to_travel_sub_title_ar || HomeContentsData?.ready_to_travel_sub_title_ar,
      ready_to_travel_photo: {
        id: uploadedFileDetails.ready_to_travel_photo?.id || HomeContentsData?.ready_to_travel_photo?.id,
      },
      ready_to_travel_sec_photo: {
        id: uploadedFileDetails.ready_to_travel_sec_photo?.id || HomeContentsData?.ready_to_travel_sec_photo?.id,
      },
      ready_to_travel_third_photo: {
        id: uploadedFileDetails.ready_to_travel_third_photo?.id || HomeContentsData?.ready_to_travel_third_photo?.id,
      },
      ready_to_travel_forth_photo: {
        id: uploadedFileDetails.ready_to_travel_forth_photo?.id || HomeContentsData?.ready_to_travel_forth_photo?.id,
      },
    };
    
      updateHomeContent(updatedHomeContent);
      enqueueSnackbar(`${translate('editSuccess')}`, { variant: 'success' });
    
    // navigate(PATH_DASHBOARD.home);
  } catch (error) {
    enqueueSnackbar(translate('HomeContent.error'), { variant: 'error' });
  }
};

const [file, setFile] = useState(null);
const [fileId, setFileId] = useState(null);
const methods = useForm({
  resolver: yupResolver(NewHomeContentSchema),
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
          case 'banner_photo':
            return {
              ...prevState,
              banner_photo: { id: uploadedFile.id, path: uploadedFile.path },
            };
          case 'banner_photo_ar':
            return {
              ...prevState,
              banner_photo_ar: { id: uploadedFile.id, path: uploadedFile.path },
            };
          case 'know_us_photo':
            return {
              ...prevState,
              know_us_photo: { id: uploadedFile.id, path: uploadedFile.path },
            };
          case 'know_us_photo_ar':
            return {
              ...prevState,
              know_us_photo_ar: { id: uploadedFile.id, path: uploadedFile.path },
            };
          case 'why_choose_photo':
            return {
              ...prevState,
              why_choose_photo: { id: uploadedFile.id, path: uploadedFile.path },
            };
          case 'why_choose_photo_ar':
            return {
              ...prevState,
              why_choose_photo_ar: { id: uploadedFile.id, path: uploadedFile.path },
            };
          case 'ready_to_travel_photo':
            return {
              ...prevState,
              ready_to_travel_photo: { id: uploadedFile.id, path: uploadedFile.path },
            };
          case 'ready_to_travel_sec_photo':
            return {
              ...prevState,
              ready_to_travel_sec_photo: { id: uploadedFile.id, path: uploadedFile.path },
            };
          case 'ready_to_travel_third_photo':
            return {
              ...prevState,
              ready_to_travel_third_photo: { id: uploadedFile.id, path: uploadedFile.path },
            };
          case 'ready_to_travel_forth_photo':
            return {
              ...prevState,
              ready_to_travel_forth_photo: { id: uploadedFile.id, path: uploadedFile.path },
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
    defaultValues,NewHomeContentSchema,HomeContentsData,onSubmit,onUpload,isLoading,handleDrop,uploadedFileDetails
  };
}
