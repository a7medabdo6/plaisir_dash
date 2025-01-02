import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  // استيراد أنماط Quill

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, FormControl, Button,Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUpload,
  RHFMultiSelect,
} from '../../../components/hook-form';

import { useLocales } from '../../../locales';

// ----------------------------------------------------------------------

ProductsNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProducts: PropTypes.object,
};

export default function ProductsNewEditForm({ isEdit, currentProducts }) {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const NewProductsSchema = Yup.object().shape({
    name_en: Yup.string().required('Name in English is required'),
    name_ar: Yup.string().required('Name in Arabic is required'),
    desc_en: Yup.string().required('Description in English is required'),
    desc_ar: Yup.string().required('Description in Arabic is required'),
    working_hours_en: Yup.string().required('Working hours in English are required'),
    working_hours_ar: Yup.string().required('Working hours in Arabic are required'),
    location_en: Yup.string().required('Location in English is required'),
    location_ar: Yup.string().required('Location in Arabic is required'),
    map: Yup.string().required('Map link is required'),
    policy_en: Yup.string().required('Policy in English is required'),
    policy_ar: Yup.string().required('Policy in Arabic is required'),
    terms_en: Yup.string().required('Terms in English are required'),
    terms_ar: Yup.string().required('Terms in Arabic are required'),
    cancellation_policy_en: Yup.string().required('Cancellation policy in English is required'),
    cancellation_policy_ar: Yup.string().required('Cancellation policy in Arabic is required'),
    price_per_night: Yup.number().required('Price per night is required'),
    photo: Yup.object().shape({
      id: Yup.string().required('Photo ID is required'),
    }),
    categories: Yup.array().min(1, 'At least one category is required'),
    features: Yup.array().min(1, 'At least one features is required'),
    user_id: Yup.string().required('userId is required'),



  });

  const defaultValues = useMemo(
    () => ({
      name_en: currentProducts?.name_en || '',
      name_ar: currentProducts?.name_ar || '',
      desc_en: currentProducts?.desc_en || '',
      desc_ar: currentProducts?.desc_ar || '',
      working_hours_en: currentProducts?.working_hours_en || '',
      working_hours_ar: currentProducts?.working_hours_ar || '',
      location_en: currentProducts?.location_en || '',
      location_ar: currentProducts?.location_ar || '',
      map: currentProducts?.map || '',
      policy_en: currentProducts?.policy_en || '',
      policy_ar: currentProducts?.policy_ar || '',
      terms_en: currentProducts?.terms_en || '',
      terms_ar: currentProducts?.terms_ar || '',
      cancellation_policy_en: currentProducts?.cancellation_policy_en || '',
      cancellation_policy_ar: currentProducts?.cancellation_policy_ar || '',
      price_per_night: currentProducts?.price_per_night || '',
      photo: currentProducts?.photo || { id: '' },
      categories: currentProducts?.categories || [],
      features: currentProducts?.features || [],
      user_id: currentProducts?.user_id || '',

    }),
    [currentProducts]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductsSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentProducts) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentProducts]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.eCommerce.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };
  const fields = [
    { name: 'name_en', label: 'Name (English)', placeholder: 'Enter name in English' },
    { name: 'name_ar', label: 'Name (Arabic)', placeholder: 'Enter name in Arabic' },
    { name: 'location_en', label: 'Location (English)', placeholder: 'Enter location in English' },
    { name: 'location_ar', label: 'Location (Arabic)', placeholder: 'Enter location in Arabic' },
    {
      name: 'desc_en', label: 'Description (English)', placeholder: 'Enter description in English',
      isEditor: true,
    },
    {
      name: 'desc_ar', label: 'Description (Arabic)', placeholder: 'Enter description in Arabic',
      isEditor: true,
    },
    {
      name: 'working_hours_en', label: 'Working Hours (English)', placeholder: 'Enter working hours in English',
      isEditor: true,
    },
    {
      name: 'working_hours_ar', label: 'Working Hours (Arabic)', placeholder: 'Enter working hours in Arabic',
      isEditor: true,
    },

    {
      name: 'policy_en', label: 'Policy (English)', placeholder: 'Enter policy in English',
      isEditor: true,
    },
    {
      name: 'policy_ar', label: 'Policy (Arabic)', placeholder: 'Enter policy in Arabic',
      isEditor: true,
    },
    {
      name: 'terms_en', label: 'Terms (English)', placeholder: 'Enter terms in English',
      isEditor: true,
    },
    {
      name: 'terms_ar', label: 'Terms (Arabic)', placeholder: 'Enter terms in Arabic',
      isEditor: true,
    },
    {
      name: 'cancellation_policy_en', label: 'Cancellation Policy (English)', placeholder: 'Enter cancellation policy in English',
      isEditor: true,
    },
    {
      name: 'cancellation_policy_ar', label: 'Cancellation Policy (Arabic)', placeholder: 'Enter cancellation policy in Arabic',
      isEditor: true,
    },
    { name: 'price_per_night', label: 'Price per Night', placeholder: 'Enter price per night' },
    { name: 'map', label: 'Map Link', placeholder: 'Enter map link' },


    { name: 'categories', label: 'Categories', placeholder: 'Select categories', isMultiSelect: true }, // Assuming it's a multi-select or dropdown
    { name: 'features', label: 'Features', placeholder: 'Select features', isMultiSelect: true }, // Assuming it's a multi-select or dropdown
    {
      name: 'photo', label: 'Photo', placeholder: 'Upload a photo',
      isUpload: true,
    }, // Assuming 'photo' is a file input
    { name: 'user_id', label: 'User Id', placeholder: 'User Id' }, // إضافة حقل inStock باستخدام RHFSwitch

  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const fieldsPerPage = 4; // عدد الحقول المعروضة في كل مرة
  console.log(fields.length / fieldsPerPage);

  const handleNext = () => {
    if (currentSlide < fields.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = (inputFile) => {
    const filtered = values.images && values.images?.filter((file) => file !== inputFile);
    setValue('images', filtered);
  };

  const handleRemoveAllFiles = () => {
    setValue('images', []);
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Grid container spacing={3}>
                {fields.slice(currentSlide * fieldsPerPage, (currentSlide + 1) * fieldsPerPage).map((field) => (
                  <Grid item xs={12} sm={6} key={field.name}>
                    <FormControl error={!!errors[field.name]} style={{ width: '100%' }}
                    >
                      {field.isEditor ? (
                        <Controller
                          name={field.name}
                          control={methods.control}
                          render={({ field }) => (
                            <div style={{ marginBottom: "20px" }}>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                {`${translate(`${field.placeholder}`)}`}
                </Typography>
                              <ReactQuill
                                {...field}
                                value={field.value || ''}
                                onChange={field.onChange}
                                onBlur={() => field.onBlur()}
                                placeholder={field.placeholder} // هنا يتم تحديد الـ placeholder
                                theme="snow"
                                modules={{
                                  toolbar: [
                                    [{ header: '1' }, { header: '2' }, { font: [] }],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['bold', 'italic', 'underline'],
                                    ['link'],
                                    ['blockquote'],
                                    [{ align: [] }],
                                    ['image', 'video'],
                                  ],
                                }}
                                formats={[
                                  'header', 'font', 'list', 'bold', 'italic', 'underline',
                                  'link', 'blockquote', 'align', 'image', 'video',
                                ]}
                                bounds={'.editor'}
                                style={{ height: '300px', marginBottom: '30px' }}
                              />

                              {errors[field.name] && <p style={{ color: '#FF5630', paddingTop: '45px', fontSize: '0.75rem' }}>{errors[field.name]?.message}</p>}
                            </div>
                          )}
                        />
                      ) : field.isUpload ? (

                        <RHFUpload
                          multiple
                          thumbnail
                          name="images"
                          maxSize={3145728}
                          onDrop={handleDrop}
                          onRemove={handleRemoveFile}
                          onRemoveAll={handleRemoveAllFiles}
                          onUpload={() => console.log('ON UPLOAD')}
                        />
                      ) : field.isSwitch ? (
                        <RHFSwitch name={field.name} label={field.label} />
                      ) : field.isMultiSelect ? (
                        <RHFMultiSelect
                          name={field.name}
                          label={field.label}
                          options={[
                            { value: 'apple', label: 'Apple' },
                            { value: 'banana', label: 'Banana' },
                            { value: 'orange', label: 'Orange' },
                            { value: 'grape', label: 'Grape' },
                          ]}
                          placeholder=" "
                        />
                      ) : (
                        <RHFTextField

                          name={field.name}
                          label={field.label}
                          placeholder={field.placeholder}
                        />
                      )}
                    </FormControl>
                  </Grid>
                ))}
              </Grid>

              {/* أزرار التنقل */}
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                  variant="outlined"
                  onClick={handlePrevious}
                  disabled={currentSlide === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={currentSlide === Math.floor(fields.length / fieldsPerPage) - 1}
                >
                  Next
                </Button>
              </Box>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Create Product' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
