import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useCallback, useEffect, useMemo } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Button, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFEditor,
  RHFUpload,
  RHFTextField,
} from '../../../components/hook-form';
//
import BlogNewPostPreview from '../blog/BlogNewPostPreview';
import { useLocales } from '../../../locales';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // استيراد أنماط Quill
import useCreateBlogMutation from 'src/hooks/Blog/useCreateBlogMutation ';
import useUploadMutation from 'src/hooks/useUploadMutation';
import useBlogTags from 'src/hooks/BlogTags/useBlogTag';
import RHFAutocomplete from 'src/pages/components/Blog/RHFAutocomplete';
import useUpdateBlogMutation from 'src/hooks/Blog/useUpdateBlogMutation';
import useSingleBlog from 'src/hooks/Blog/useSingleBlog';
import { useHandleFile } from './helpers/useBlogFormHelpers';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function BlogNewPostForm({ isEdit, currentBlogTags }) {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { id } = useParams();
  const { data: BlogData } = useSingleBlog(id);
  console.log(BlogData);
  const { mutate: updateBlog, isLoading: isUpdating } = useUpdateBlogMutation();

  const Params = {

    limit: 5,

  };
  const { data, isError, error } = useBlogTags(Params);

  const { enqueueSnackbar } = useSnackbar();
  const [isProcessing, setIsProcessing] = useState(false);

  const [openPreview, setOpenPreview] = useState(false);

  const NewBlogSchema = Yup.object().shape({
    title_ar: Yup.string().required(`${translate('bloging.errors.title')}`),
    title_en: Yup.string().required(`${translate('bloging.errors.title')}`),

    // tags: Yup.array().min(1, `${translate('bloging.errors.tags.min')}`),
    photo: Yup.mixed().required(`${translate('bloging.errors.photo.required')}`).nullable(true),
    desc_en: Yup.string().required(`${translate('bloging.errors.description')}`),
    desc_ar: Yup.string().required(`${translate('bloging.errors.description')}`),
    content_en: Yup.string().required(`${translate('bloging.errors.content')}`),
    content_ar: Yup.string().required(`${translate('bloging.errors.content')}`),
  });

  const [selectedOptions, setSelectedOptions] = useState([]); // تخزين العناصر المختارة بالكامل
  const selectedOptionIds = selectedOptions.map(option => option.id);
  console.log(selectedOptionIds);
  
  const defaultValues = useMemo(
    () => ({
      title_ar: BlogData?.title_ar || '',
      title_en: BlogData?.title_ar || '',
      photo: null,
      tags: BlogData?.tags || selectedOptionIds,
      desc_en: BlogData?.desc_en || '',
      desc_ar: BlogData?.desc_ar || '',
      content_en: BlogData?.content_en || '',
      content_ar: BlogData?.content_ar || '',
    }),
    [BlogData]
  );


  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  useEffect(() => {
    if (BlogData) {
      methods.reset(defaultValues);
    }
  }, [BlogData, methods, defaultValues]);
  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = methods;

  const values = watch();

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const handleQuillChange = (field, value) => {
    setValue(field, value, { shouldValidate: true });
  };



  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFile = acceptedFiles[0];  // استقبل ملف واحد فقط
      if (newFile) {
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        });

        setFile(newFile);  // حفظ الملف في state
        setValue('photo', [newFile], { shouldValidate: true });  // استبدل الصورة السابقة
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue('photo', null);
  };


  const [currentStep, setCurrentStep] = useState(1); // لتتبع الخطوة الحالية
  const [isNextDisabled, setIsNextDisabled] = useState(true); // لتتبع ما إذا كان الزر معطلاً أم لا


  const descEn = methods.watch('desc_en');
  const descAr = methods.watch('desc_ar');
  const contentEn = methods.watch('content_en');
  const contentAr = methods.watch('content_ar');
  const photoUp = methods.watch('photo');

  // التعامل مع تغيير الخطوات
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // التعامل مع خطوات الرجوع
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // تحديث حالة الزر بناءً على قيمة الحقل
  useEffect(() => {
    // التحقق من الحقول وتفعيل زر Next
    if (
      (currentStep === 1 && descEn && descAr) ||  // إذا كانت الحقول الخاصة بالعناوين والوصف موجودة
      (currentStep === 2 && contentEn && contentAr) || // إذا كانت الصورة قد تم تحميلها
      (currentStep === 3 && photoUp) // إذا كانت الحقول الخاصة بالمحتوى والتصنيفات مكتملة
    ) {
      setIsNextDisabled(false); // تفعيل الزر
    } else {
      setIsNextDisabled(true); // تعطيل الزر
    }
  }, [currentStep, descEn, descAr, contentEn, contentAr, photoUp]);
  const handleRemoveAllFiles = () => {
    setValue('photo', []);
  };
  const most_popular = methods.watch('most_popular');


  const [photo, setPhoto] = useState(null);

  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const uploadMutation = useUploadMutation();

  const { mutate: createBlog, isLoading: isCreating } = useCreateBlogMutation();
  const onUpload = () => {
    console.log("45454");

    if (!file) {
      alert('Please select a file first.');
      return;
    }
    setIsLoading(true);

    uploadMutation.mutate(file, {
      onSuccess: (data) => {
        setIsLoading(false);
        setPhoto(data.file.id);
        setFileId(data.file.id);
        enqueueSnackbar(`${translate('imageUploadSuccess')}`, { variant: 'success' });
      },
      onError: (error) => {
        setIsLoading(false);
        console.error('Upload failed:', error);
      },
    });
  };
  const onSubmit = (formData) => {
    console.log("45");

    setIsProcessing(true); // Set processing to true
    if (isEdit) {
      const updatedFeature = {
        id: BlogData?.id,
        title_en: formData.title_en || BlogData.title_en,
        title_ar: formData.title_ar || BlogData.title_ar,
        desc_en: formData.desc_en || BlogData.desc_en,
        desc_ar: formData.desc_ar || BlogData.desc_ar,
        content_en: formData.content_en || BlogData.content_en,
        content_ar: formData.content_ar || BlogData.content_ar,
        most_popular: formData.most_popular || BlogData.most_popular,
        tags: selectedOptionIds || BlogData.tags,
        photo: { id: fileId } || { id: photo?.id },
      };

      updateBlog(updatedFeature, {
        onSuccess: () => {
          enqueueSnackbar(translate('editSuccess'), { variant: 'success' });
          navigate('/dashboard/blog');
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
        title_en: formData?.title_en || '',
        title_ar: formData?.title_ar || '',
        desc_en: formData?.desc_en || '',
        desc_ar: formData?.desc_ar || '',
        content_en: formData?.content_en || '',
        content_ar: formData?.content_ar || '',
        photo: { id: fileId },
        tags: selectedOptionIds || [],
        most_popular: most_popular,
      };

      createBlog(data, {
        onSuccess: () => {
          enqueueSnackbar(translate('addSuccess'), { variant: 'success' });
          navigate('/dashboard/blog');
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


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>


              {currentStep === 1 && (
                <div>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {translate('bloging.desc_ar')}
                  </Typography>
                  <ReactQuill
                    value={methods.getValues('desc_ar')}
                    onChange={(value) => handleQuillChange('desc_ar', value)}
                    theme="snow"
                    style={{ height: '200px', marginBottom: '50px' }}
                  />
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {translate('bloging.desc_en')}
                  </Typography>
                  <ReactQuill
                    value={methods.getValues('desc_en')}
                    onChange={(value) => handleQuillChange('desc_en', value)}
                    theme="snow"
                    style={{ height: '200px', marginBottom: '50px' }}
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {translate('bloging.content_en')}
                  </Typography>
                  <ReactQuill
                    value={methods.getValues('content_en')}
                    onChange={(value) => handleQuillChange('content_en', value)}
                    theme="snow"
                    style={{ height: '200px', marginBottom: '50px' }}
                  />
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {translate('bloging.content_ar')}
                  </Typography>
                  <ReactQuill
                    value={methods.getValues('content_ar')}
                    onChange={(value) => handleQuillChange('content_ar', value)}
                    theme="snow"
                    style={{ height: '200px', marginBottom: '50px' }}
                  />
                </div>
              )}



              {/* Photo Upload Step */}
              {currentStep === 3 && (
                <div>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {translate('bloging.photo')}
                  </Typography>
                  <RHFUpload
                    multiple
                    thumbnail
                    name="photo"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    onRemove={handleRemoveFile}
                    onRemoveAll={handleRemoveAllFiles}
                    onUpload={onUpload}
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={handlePrev}
                  disabled={currentStep === 1} // Disable Previous on the first step
                >
                  Prev
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleNext}
                  disabled={isNextDisabled} // تعطيل الزر إذا كان معطلاً
                >
                  Next
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>


              <RHFAutocomplete
                name="tags"
                label={`${translate('bloging.tags')}`}
                multiple
                freeSolo
                options={data?.data}
                ChipProps={{ size: 'small' }}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}

              />

              <RHFTextField
                name="title_en"
                label={`${translate('bloging.title_en')}`}
                error={Boolean(errors.title_en)}
                helperText={errors.title_en?.message}
              />
              {errors.title_en && (
                <Typography color="error" variant="caption">
                  {errors.title_en.message}
                </Typography>
              )}

              <RHFTextField
                name="title_ar"
                label={`${translate('bloging.title_ar')}`}
                error={Boolean(errors.title_ar)}
                helperText={errors.title_ar?.message}
              />
              {errors.title_ar && (
                <Typography color="error" variant="caption">
                  {errors.title_ar.message}
                </Typography>
              )}

              <RHFSwitch
                name="most_popular"
                labelPlacement="start"
                label="most_popular"
              />
            </Stack>
          </Card>

          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              size="large"
              onClick={handleOpenPreview}
            >
              {`${translate('bloging.preview')}`}
            </Button>

            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
              disabled={!isValid} // تعطيل الزر إذا كانت الحقول غير صحيحة

            >
              {`${translate('bloging.post')}`}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>

      <BlogNewPostPreview
        values={values}
        open={openPreview}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}
