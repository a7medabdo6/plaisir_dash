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
    photo: Yup.object().shape({
      id: Yup.string().required(`${translate('products.placeholders.photo_id')}`),
    }),
    categories: Yup.array().min(1, `${translate('products.placeholders.categories')}`),
    features: Yup.array().min(1, `${translate('products.placeholders.features')}`),
    user_id: Yup.string().required(`${translate('products.placeholders.user_id')}`),
    is_child_allowed: Yup.boolean().required(),
    most_popular: Yup.boolean().required(),
    price_for_each_child: Yup.number().required(`${translate('products.placeholders.price_for_each_child')}`),
    start_date: Yup.string().required(),
    end_date: Yup.string().required(),
    min_age_allowed: Yup.number().required(),
    is_free: Yup.boolean().required(),
    is_new: Yup.boolean().required(),
    is_Quantitive: Yup.boolean().required(),
    tickets_num: Yup.number().required(`${translate('products.placeholders.tickets_num')}`),
    company: Yup.array().min(1, `${translate('products.placeholders.company')}`),


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
      min_age_allowed: currentProducts?.min_age_allowed || null,
      is_free: currentProducts?.is_free || false,
      is_new: currentProducts?.is_new || false,
      is_Quantitive: currentProducts?.is_Quantitive || false,
      tickets_num: currentProducts?.is_Quantitive === false ? 0 : currentProducts?.tickets_num || 0,
      company: currentProducts?.company || [],
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
  const isQuantitive = values.is_Quantitive;





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
      isNumber:true

    },
    {
      name: 'price_per_night',
      label: 'Price Per Night',
      placeholder: 'Enter price per night',
      isNumber:true
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
      name: 'company',
      label: 'company',
      placeholder: 'Select company',
      isMultiSelect: true,
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

  const [currentSlide, setCurrentSlide] = useState(0);

  const fieldsPerPage = 6; // عدد الحقول المعروضة في كل مرة
  console.log(currentSlide);

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
        <Grid item xs={currentSlide === 0 ? 8 : 12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Grid container spacing={3}>
                {fields.slice(currentSlide * fieldsPerPage, (currentSlide + 1) * fieldsPerPage).map((field) => (

                  <Grid item xs={12} sm={12} key={field.name}>
                    <FormControl error={!!errors[field.name]} style={{ width: '100%' }}
                    >
                      {field.isEditor ? (

                        <Controller
                          name={field.name}
                          control={methods.control}
                          render={({ field }) => (
                            <div style={{ marginBottom: "20px" }}>

                              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                {`${translate(`${field.name}`)}`}
                              </Typography>
                              <ReactQuill
                                {...field}
                                value={field.value || ''}
                                onChange={field.onChange}
                                onBlur={() => field.onBlur()}
                                placeholder={field.placeholder}  // تأكد من تمريره مباشرة هنا

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
                                style={{ height: '200px', marginBottom: '30px' }}

                              />

                              {errors[field.name] && <p style={{ color: '#FF5630', paddingTop: '45px', fontSize: '0.75rem' }}>{errors[field.name]?.message}</p>}
                            </div>
                          )}
                        />
                      ) : field.isUpload ? (
                        <>

                          <RHFUpload
                            multiple
                            thumbnail
                            name="photo"
                            maxSize={3145728}
                            onDrop={handleDrop}
                            onRemove={handleRemoveFile}
                            onRemoveAll={handleRemoveAllFiles}
                            onUpload={() => console.log('ON UPLOAD')}
                          />
                          {
                            field.name === 'photo' && !values.photo.id ? (
                              <Typography variant="body2" color="text.secondary">No photo selected</Typography> // النص عند عدم وجود صورة
                            ) : null
                          }
                        </>
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

                      ) : field.isNumber ? (
                        <RHFTextField
                          type='number'
                          name={field.name}
                          label={field.label}
                          placeholder={field.placeholder}
                        />
                      ) : field.isDate ? (
                        <RHFTextField 
                        type="date" // Ensure this is set to "date"

                         name={field.name}
                        label={field.label}
                        placeholder={field.placeholder} />
                       
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



            </Stack>
          </Card>
        </Grid>
        {currentSlide === 0 && (
          <Grid item xs={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Grid container spacing={3}>
                  {fieldsLeft.map((field) => {
                    // إذا كان الحقل هو 'is_Quantitive'، يتم عرض الحقل فقط إذا كانت قيمته true
                    if (field.name === 'is_Quantitive') {
                      return (
                        <Grid item xs={12} sm={12} key={field.name}>
                          <FormControl style={{ width: '100%' }}>
                            <RHFSwitch name={field.name} label={field.label} />
                          </FormControl>
                        </Grid>
                      );
                    }

                    // إذا كانت قيمة 'is_Quantitive' true، يتم عرض 'tickets_num'
                    if (field.name === 'tickets_num' && isQuantitive === true) {
                      return (
                        <Grid item xs={12} sm={12} key={field.name}>
                          <FormControl style={{ width: '100%' }}>
                            <RHFTextField
                              name={field.name}
                              label={field.label}
                              placeholder={field.placeholder}
                            />
                          </FormControl>
                        </Grid>
                      );
                    }

                    // عرض الحقول الأخرى
                    return (
                      <Grid item xs={12} sm={12} key={field.name}>
                        <FormControl style={{ width: '100%' }}>
                          {field.isMultiSelect ? (
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
                          ) : field.isSwitch ? (
                            <RHFSwitch name={field.name} label={field.label} />
                          ) : null}
                        </FormControl>
                      </Grid>
                    );
                  })}


                </Grid>




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
            disabled={currentSlide === Math.ceil(fields.length / fieldsPerPage) - 1}
          >
            Next
          </Button>
        </Box>

        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting} style={{ width: '100%', marginTop: '10px' }}>
          {!isEdit ? 'Create Product' : 'Save Changes'}
        </LoadingButton>

        {/* {
                currentSlide === Math.floor(fields.length / fieldsPerPage) - 1 && (
                  <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting} style={{width:'100%',marginTop:'10px'}}>
                    {!isEdit ? 'Create Product' : 'Save Changes'}
                  </LoadingButton>
                )
              } */}
      </Grid>
    </FormProvider>
  );
}
