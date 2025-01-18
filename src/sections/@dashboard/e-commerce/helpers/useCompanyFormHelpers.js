import { useMemo, useEffect, useState, useCallback } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';

import { useLocales } from 'src/locales';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import useCreateCompanyMutation from 'src/hooks/Company/useCreateCompanyMutation ';
import useUploadMutation from 'src/hooks/useUploadMutation';
import useUpdateCompanyMutation from 'src/hooks/Company/useUpdateCompanyMutation';

export const useCompanyFormHelpers = (isEdit, CompanyData,setValue,defaultValues,methods) => {
  console.log(CompanyData);
  const [isLoading, setIsLoading] = useState(false);
  const uploadMutation = useUploadMutation();

  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [uploadedFileDetails, setUploadedFileDetails] = useState({
    photo_id: null,
    commercial_register: null,
   
  });
  

  useEffect(() => {
    if (CompanyData) {
      methods.reset(defaultValues);
    }
  }, [CompanyData, methods, defaultValues]);

  const { mutate: createCompany, isLoading: isCreating } = useCreateCompanyMutation();
  const { mutate: updateCompanyMutation, isLoading: isUpdating } = useUpdateCompanyMutation();
  const onSubmit = (formData) => {
    setIsProcessing(true); // Set processing to true
    if (isEdit) {
      const updatedCompany = {
        id: CompanyData?.id,
        commercial_name_en: formData.commercial_name_en || CompanyData.commercial_name_en,
        commercial_name_ar: formData.commercial_name_ar || CompanyData.commercial_name_ar,
        icon: formData.icon || CompanyData.icon,
        country: formData.country || CompanyData.country,
        phone: formData.phone || CompanyData.phone,
        notes: formData.notes || CompanyData.notes,
        locaton: formData.locaton || CompanyData.locaton,
        photo_id: {
          id: uploadedFileDetails.photo_id?.id || HomeContentsData?.photo_id?.id,
        },
        commercial_register: {
          id: uploadedFileDetails.commercial_register?.id || HomeContentsData?.commercial_register?.id,
        },
      };
      
      updateCompanyMutation(updatedCompany, {
        onSuccess: () => {
          enqueueSnackbar(translate('editSuccess'), { variant: 'success' });
          navigate('/dashboard/company');
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
        commercial_name_en: formData.commercial_name_en || '',
        commercial_name_ar: formData.commercial_name_ar || '',
        icon: formData.icon || '',
        country: formData.country || '',
        phone: formData.phone || '',
        notes: formData.notes || '',
        locaton: formData.locaton || '',
        photo_id: {
          id: formData.photo_id?.id || '',
        },
        commercial_register: {
          id: formData.commercial_register?.id || '',
        },
      };
      
      createCompany(data, {
        onSuccess: () => {
          enqueueSnackbar(translate('addSuccess'), { variant: 'success' });
          navigate('/dashboard/company');
        },
        onError: (error) => {
          enqueueSnackbar(translate('addError'), { variant: 'error' });
          console.error('Error creating Company:', error);
        },
        onSettled: () => {
          setIsProcessing(false); // Set processing to false
        },
      });
    }
  };


    const handleDrop = useCallback(
      (acceptedFiles) => {
        const newFile = acceptedFiles[0];  // استقبل ملف واحد فقط
        if (newFile) {
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          });
          
          setFile(newFile);  // حفظ الملف في state
          setValue('images', [newFile], { shouldValidate: true });  // استبدل الصورة السابقة
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
              case 'commercial_register':
                return {
                  ...prevState,
                  commercial_register: { id: uploadedFile.id, path: uploadedFile.path },
                };
              case 'photo_id':
                return {
                  ...prevState,
                  photo_id: { id: uploadedFile.id, path: uploadedFile.path },
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
    const handleRemoveFile = (fieldName) => {
      setValue(fieldName, null);  // إزالة الصورة المحددة
    };
  
    const handleRemoveAllFiles = (fieldName) => {
      setValue(fieldName, null);  // إزالة كل الصور
    };
  
  return {
    isProcessing,
    defaultValues,
    onSubmit,
    isCreating,
    isUpdating,
    onUpload,
    handleDrop,
    handleRemoveFile,
    handleRemoveAllFiles,
    setFile

  };
};
