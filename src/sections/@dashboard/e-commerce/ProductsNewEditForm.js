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
import { DatePicker, LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, FormControl, Button, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUpload,
  RHFMultiSelect,
  RHFSelect,
  RHFUploadWithLabel,
} from '../../../components/hook-form';

import { useLocales } from '../../../locales';
import useCompany from 'src/hooks/Company/useCompany';
import useFeatures from 'src/hooks/Features/useFeatures';
import useCategories from 'src/hooks/Category/useCategories';
import useUploadMutation from 'src/hooks/useUploadMutation';
import useCreateTripMutation from 'src/hooks/Trips/useCreateTripsMutation ';
import useUpdateTripMutation from 'src/hooks/Trips/useUpdateTripsMutation';

// ----------------------------------------------------------------------

ProductsNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProducts: PropTypes.object,
};

export default function ProductsNewEditForm({ isEdit, currentProducts }) {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const initialParams = {
    orderBy: 'id',
    order: 'desc',

  };
  const initialParamsCate = {
    orderBy: 'id',
    order: 'desc',

    filterOptions: { searchKey: 'name_en', searchValue: '' },
  };
  const { data: CompanyData } = useCompany(initialParams);
  const { data: FeaturesData } = useFeatures(initialParams);
  const { data: CategoriesData } = useCategories(initialParamsCate);
  const uploadMutation = useUploadMutation();
  const { mutate: createTrip, isLoading: isCreating } = useCreateTripMutation();
  const { mutate: updateTripsMutation, isLoading: isUpdating } = useUpdateTripMutation();

  const NewProductsSchema = Yup.object().shape({
    name_en: Yup.string().required(`${translate('products.placeholders.name_en')}`),
    name_ar: Yup.string().required(`${translate('products.placeholders.name_ar')}`),

    minimum_nights: Yup.number().required(`${translate('products.placeholders.minimum_nights')}`),


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
    photo: Yup.object()
      .shape({
        id: Yup.string().required(`${translate('products.placeholders.photo_id')}`),
      })
      .nullable(),

    categories: Yup.array().min(1, `${translate('products.placeholders.categories')}`),
    features: Yup.array().min(1, `${translate('products.placeholders.features')}`),
    user_id: Yup.string().required(`${translate('products.placeholders.user_id')}`),
    is_child_allowed: Yup.boolean().required(),
    most_popular: Yup.boolean().required(),
    price_for_each_child: Yup.number().required(`${translate('products.placeholders.price_for_each_child')}`),
    start_date: Yup.string().required(),
    end_date: Yup.string().required(),
    min_age_allowed: Yup.boolean().required(),
    is_free: Yup.boolean().required(),
    is_new: Yup.boolean().required(),
    is_Quantitive: Yup.boolean().required(),
    tickets_num: Yup.number().when('is_Quantitive', {
      is: true, // إذا كانت القيمة true
      then: (schema) => schema.required(`${translate('products.placeholders.tickets_num')}`),
      otherwise: (schema) => schema.notRequired(),
    }), company: Yup.object()
      .shape({
        id: Yup.number()
          .required(`${translate('products.placeholders.company')}`)
          .integer()
          .positive(),
      })
      .nullable(),



  });

  const defaultValues = useMemo(
    () => ({
      name_en: currentProducts?.name_en || '',
      name_ar: currentProducts?.name_ar || '',
      photo: currentProducts?.photo || { id: '' },
      categories: currentProducts?.categories || [],
      features: currentProducts?.features || [],
      price_per_night: currentProducts?.price_per_night || 0,
      map: currentProducts?.map || '',
      minimum_nights: currentProducts?.minimum_nights || '',
      desc_en: currentProducts?.desc_en || '',
      desc_ar: currentProducts?.desc_ar || '',
      working_hours_en: currentProducts?.working_hours_en || '',
      working_hours_ar: currentProducts?.working_hours_ar || '',
      location_en: currentProducts?.location_en || '',
      location_ar: currentProducts?.location_ar || '',
      policy_en: currentProducts?.policy_en || '',
      policy_ar: currentProducts?.policy_ar || '',
      terms_en: currentProducts?.terms_en || '',
      terms_ar: currentProducts?.terms_ar || '',
      cancellation_policy_en: currentProducts?.cancellation_policy_en || '',
      cancellation_policy_ar: currentProducts?.cancellation_policy_ar || '',

      user_id: currentProducts?.user_id || '',

      // الحقول الجديدة
      is_child_allowed: currentProducts?.is_child_allowed || false,
      most_popular: currentProducts?.most_popular || false,
      price_for_each_child: currentProducts?.price_for_each_child || null,
      start_date: currentProducts?.start_date || '',
      end_date: currentProducts?.end_date || '',
      min_age_allowed: currentProducts?.min_age_allowed || false,
      is_free: currentProducts?.is_free || false,
      is_new: currentProducts?.is_new || false,
      is_Quantitive: currentProducts?.is_Quantitive || false,
      tickets_num: currentProducts?.tickets_num || null,
      company: currentProducts?.company || [],
    }),
    [currentProducts]
  );


  const methods = useForm({
    resolver: yupResolver(NewProductsSchema),
    defaultValues
  });


  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();
  const isQuantitive = values.is_Quantitive;
  const [isProcessing, setIsProcessing] = useState(false);





  useEffect(() => {
    if (isEdit && currentProducts) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentProducts]);

  const onSubmit = (formData) => {
    console.log(formData);

    setIsProcessing(true); // Set processing to true
    const data = {
      name_en: formData.name_en || "name_en",
      name_ar: formData.name_ar || "name_ar",
      desc_ar: formData.desc_ar || "desc_ar",
      is_child_allowed: formData.is_child_allowed ?? false,
      most_popular: formData.most_popular ?? true,
      price_for_each_child: formData.price_for_each_child || "20",
      start_date: formData.start_date || "2025-01-10T",
      end_date: formData.end_date || "2025-01-10T",
      min_age_allowed: formData.min_age_allowed || false,
      is_free: formData.is_free ?? false,
      is_new: formData.is_new ?? true,
      is_Quantitive: formData.is_Quantitive ?? false,
      tickets_num: formData.tickets_num || 100,
      desc_en: formData.desc_en || "desc_en",
      working_hours_en: formData.working_hours_en || "working hours en",
      working_hours_ar: formData.working_hours_ar || "working hours ar",
      location_en: formData.location_en || "location_en",
      location_ar: formData.location_ar || "location_ar",
      map: formData.map || "map",
      policy_en: formData.policy_en || "policy_en",
      policy_ar: formData.policy_ar || "policy_ar",
      terms_en: formData.terms_en || "terms_en",
      terms_ar: formData.terms_ar || "terms_ar",
      cancellation_policy_en: formData.cancellation_policy_en || "cancellation_policy_en",
      cancellation_policy_ar: formData.cancellation_policy_ar || "cancellation_policy_ar",
      // minimum_nights: formData.minimum_nights || 200,
      price_per_night: formData.price_per_night || 200,
      userId: formData.userId || 1,
      photo: {
        id: formData.photo?.id || "string",
      },
      categories: formData.categories || [1],
      features: formData.features || [1, 2],
      company: {
        id: formData.company?.id || 2,
      },
    };



    createTrip(data, {

      onSuccess: () => {
        enqueueSnackbar(translate('addSuccess'), { variant: 'success' });
        // navigate('/dashboard/company');
      },
      onError: (error) => {
        enqueueSnackbar(translate('addError'), { variant: 'error' });
        console.error('Error creating Company:', error);
      },
      onSettled: () => {
        setIsProcessing(false); // Set processing to false
      },
    });
  };



  const options = CategoriesData?.data?.map((category) => ({
    value: category.id,
    label: category.name_en, // يمكنك استخدام category.name_ar للعرض بالعربية
  }));
  const optionsfeatures = FeaturesData?.data?.map((category) => ({
    value: category.id,
    label: category.name_en, // أو استخدم category.name_ar إذا كنت تريد العرض بالعربية
  }))

  const optionsCompany = CompanyData?.data?.map((category) => ({
    value: category.id,
    label: category.commercial_name_en, // أو استخدم category.name_ar إذا كنت تريد العرض بالعربية
  }))

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const fieldsPerPage = 6; // عدد الحقول المعروضة في كل مرة

  const handleNext = () => {
    setCurrentSlide(currentSlide + 1);

  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

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



  const handleRemoveFile = (inputFile) => {
    const filtered = values.images && values.images?.filter((file) => file !== inputFile);
    setValue('images', filtered);
  };

  const handleRemoveAllFiles = () => {
    setValue('images', []);
  };
  const [uploadedFileDetails, setUploadedFileDetails] = useState({
    photo: null,

  });
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
            case 'photo':
              return {
                ...prevState,
                photo: { id: uploadedFile.id, path: uploadedFile.path },
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
  const handleQuillChange = (field, value) => {
    setValue(field, value, { shouldValidate: true });
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={currentSlide === 0 ? 8 : 12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Grid container spacing={3}>
                {currentSlide === 0 && (
                  <Stack spacing={3} sx={12} style={{ width: "100%" }}>
                    <RHFTextField name="name_en" label={`${translate('products.placeholders.name_en')}`} />
                    <RHFTextField name="name_ar" label={`${translate('products.placeholders.name_ar')}`} />
                    <RHFTextField name="minimum_nights" type='number' label={`${translate('products.placeholders.minimum_nights')}`} />
                    <RHFTextField name="price_per_night" type='number' label={`${translate('products.placeholders.price_per_night')}`} />
                    <RHFTextField name="start_date" type='date' label={`${translate('products.placeholders.start_date')}`} />
                    <RHFTextField name="end_date" type='date' label={`${translate('products.placeholders.end_date')}`} />

                  </Stack>
                )}
                {currentSlide === 1 && (
                  <Stack spacing={3} sx={12} style={{ width: "100%" }}>
                    <ReactQuill
                      value={methods.getValues("desc_en")}
                      onChange={(value) => handleQuillChange("desc_en", value)}
                      theme="snow"
                      style={{ height: '200px', marginBottom: '50px' }}
                    />
                    {methods.formState.errors.desc_en && (
                      <span style={{ color: "#FF5630" }}>{methods.formState.errors.desc_en.message}</span>
                    )}
                    <ReactQuill
                      value={methods.getValues("desc_ar")}
                      onChange={(value) => handleQuillChange("desc_ar", value)}
                      theme="snow"
                      style={{ height: '200px', marginBottom: '50px' }}
                    />
                    {methods.formState.errors.desc_ar && (
                      <span style={{ color: "#FF5630" }}>{methods.formState.errors.desc_ar.message}</span>
                    )}
                    <RHFUploadWithLabel
                      thumbnail
                      name="photo"
                      label={translate('Company.photo.value')}
                      defaultValue={defaultValues.photo.id}
                      multiple
                      onDrop={(acceptedFiles) => handleDrop(acceptedFiles, 'photo')}
                      onRemove={() => handleRemoveFile('photo')}
                      onRemoveAll={() => handleRemoveAllFiles('photo')}
                      onUpload={() => onUpload('photo')}
                      isLoading={isLoading}
                    />
                    <RHFSwitch name='most_popular' label='most_popular' />
                    <RHFSwitch name='is_child_allowed' label='is_child_allowed' />

                    <RHFTextField name="price_for_each_child" label={`${translate('products.placeholders.price_for_each_child')}`} />

                  </Stack>

                )}

                {currentSlide === 2 && (
                  <Stack spacing={3} sx={12} style={{ width: "100%" }}>
                    <ReactQuill
                      value={methods.getValues("working_hours_en")}
                      onChange={(value) => handleQuillChange("working_hours_en", value)}
                      theme="snow"
                      style={{ height: '200px', marginBottom: '50px' }}
                    />
                    {methods.formState.errors.working_hours_en && (
                      <span style={{ color: "#FF5630" }}>{methods.formState.errors.working_hours_en.message}</span>
                    )}
                    <ReactQuill
                      value={methods.getValues("working_hours_ar")}
                      onChange={(value) => handleQuillChange("working_hours_ar", value)}
                      theme="snow"
                      style={{ height: '200px', marginBottom: '50px' }}
                    />

                    {methods.formState.errors.working_hours_ar && (
                      <span style={{ color: "#FF5630" }}>{methods.formState.errors.working_hours_ar.message}</span>
                    )}
                    <ReactQuill
                      value={methods.getValues("terms_en")}
                      onChange={(value) => handleQuillChange("terms_en", value)}
                      theme="snow"
                      style={{ height: '200px', marginBottom: '50px' }}
                    />
                    {methods.formState.errors.terms_en && (
                      <span style={{ color: "#FF5630" }}>{methods.formState.errors.terms_en.message}</span>
                    )}
                    <ReactQuill
                      value={methods.getValues("terms_ar")}
                      onChange={(value) => handleQuillChange("terms_ar", value)}
                      theme="snow"
                      style={{ height: '200px', marginBottom: '50px' }}
                    />
                    {methods.formState.errors.terms_ar && (
                      <span style={{ color: "#FF5630" }}>{methods.formState.errors.terms_ar.message}</span>
                    )}
                    <ReactQuill
                      value={methods.getValues("policy_en")}
                      onChange={(value) => handleQuillChange("policy_en", value)}
                      theme="snow"
                      style={{ height: '200px', marginBottom: '50px' }}
                    />
                    {methods.formState.errors.policy_en && (
                      <span style={{ color: "#FF5630" }}>{methods.formState.errors.policy_en.message}</span>
                    )}
                    <ReactQuill
                      value={methods.getValues("policy_ar")}
                      onChange={(value) => handleQuillChange("policy_ar", value)}
                      theme="snow"
                      style={{ height: '200px', marginBottom: '50px' }}
                    />
                    {methods.formState.errors.policy_ar && (
                      <span style={{ color: "#FF5630" }}>{methods.formState.errors.policy_ar.message}</span>
                    )}
                  </Stack>

                )}

                {currentSlide === 3 && (


                  <Stack spacing={3} sx={12} style={{ width: "100%" }}>
                    <ReactQuill
                      value={methods.getValues("cancellation_policy_en")}
                      onChange={(value) => handleQuillChange("cancellation_policy_en", value)}
                      theme="snow"
                      style={{ height: '200px', marginBottom: '50px' }}
                    />
                    {methods.formState.errors.cancellation_policy_en && (
                      <span style={{ color: "#FF5630" }}>{methods.formState.errors.cancellation_policy_en.message}</span>
                    )}

                    <ReactQuill
                      value={methods.getValues("cancellation_policy_ar")}
                      onChange={(value) => handleQuillChange("cancellation_policy_ar", value)}
                      theme="snow"
                      style={{ height: '200px', marginBottom: '50px' }}
                    />
                    {methods.formState.errors.cancellation_policy_ar && (
                      <span style={{ color: "#FF5630" }}>{methods.formState.errors.cancellation_policy_ar.message}</span>
                    )}


                    <RHFTextField name="location_en" label={`${translate('products.placeholders.location_en')}`} />
                    <RHFTextField name="location_ar" label={`${translate('products.placeholders.location_ar')}`} />
                    <RHFTextField name="map" label={`${translate('products.placeholders.map')}`} />
                    <RHFTextField name="user_id" label={`${translate('products.placeholders.user_id')}`} />


                  </Stack>

                )}
                {currentSlide === 4 && (


                  <Stack spacing={3} sx={12} style={{ width: "100%" }}>

                    <RHFSwitch name="min_age_allowed" label="min_age_allowed" />

                    <RHFSelect native name="company" label={`${translate('products.Country')}`} placeholder="company">
                      <option value="6" />
                      {optionsCompany.map((country) => (
                        <option key={country.id} value={country.label}>
                          {country.label}
                        </option>
                      ))}
                    </RHFSelect>


                  </Stack>

                )}

              </Grid>



            </Stack>
          </Card>
        </Grid>
        {currentSlide === 0 && (
          <Grid item xs={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFMultiSelect
                  name='categories'
                  label='categories'
                  options={options}

                  placeholder=" "
                />
                <RHFMultiSelect
                  name='features'
                  label='features'
                  options={optionsfeatures}

                  placeholder=" "
                />
                <RHFSwitch name="is_free" label="is_free" />
                <RHFSwitch name="is_new" label="is_new" />
                <RHFSwitch name="is_Quantitive" label="is_Quantitive" />
                {
                  isQuantitive && (<Grid item xs={12} sm={12} >
                    <RHFTextField
                      name="tickets_num"
                      label="tickets_num"
                      placeholder="tickets_num"
                    />
                  </Grid>)
                }


              </Stack>

            </Card>
          </Grid>)}
        {/* أزرار التنقل */}
        <Box display="flex" justifyContent="space-between" mt={2} style={{ width: '100%' }}>
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
            disabled={currentSlide === 4}
          >
            Next
          </Button>
        </Box>



        {/* {
                currentSlide === Math.floor(fields.length / fieldsPerPage) - 1 && (
                  <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting} style={{width:'100%',marginTop:'10px'}}>
                    {!isEdit ? 'Create Product' : 'Save Changes'}
                  </LoadingButton>
                )
              } */}
      </Grid>
      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting} style={{ width: '100%', marginTop: '10px' }}>
        {!isEdit ? 'Create Product' : 'Save Changes'}
      </LoadingButton>
    </FormProvider>
  );
}
