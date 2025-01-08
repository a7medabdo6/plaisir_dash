// hooks/useCategoryFormHelpers.js
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useUpdateCategoryMutation from 'src/hooks/Category/useUpdateCategoryMutation';
import useCreateCategoryMutation from 'src/hooks/Category/useCreateCategoryMutation ';
import useUploadMutation from 'src/hooks/useUploadMutation';
import { useSnackbar } from 'notistack';
import { useLocales } from 'src/locales';

export const useCategoryForm = (isEdit, currentCategory, data,setValue) => {
  const navigate = useNavigate();
    const { translate } = useLocales();
  
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [photo, setPhoto] = useState(null);

  const uploadMutation = useUploadMutation();
  const createMutation = useCreateCategoryMutation();
  const { mutate: updateCategory, isLoading: isUpdating } = useUpdateCategoryMutation();

  useEffect(() => {
    if (data) {
      setNameEn(data.name_en || '');
      setNameAr(data.name_ar || '');
      setPhoto(data?.photo?.id || null);
    }
  }, [data]);

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
  const onUpload = () => {
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

  const handleSubmitCategory = async (formData) => {
    const categoryData = {
      name_en: formData.name_en,
      name_ar: formData.name_ar,
      photo: { id: fileId },
    };

    try {
      if (isEdit) {
        const updatedCategory = {
          id: data?.id,
          name_en: formData.name_en || nameEn,
          name_ar: formData.name_ar || nameAr,
          photo: fileId || photo ? { id: photo } : null,
        };
        updateCategory(updatedCategory);
        enqueueSnackbar(`${translate('editSuccess')}`, { variant: 'success' });
      } else {
        await createMutation.mutateAsync(categoryData);
        enqueueSnackbar(`${translate('addSuccess')}`, { variant: 'success' });
      }
      navigate('/dashboard/category');
    } catch (error) {
      console.error('Error during submission:', error);
      enqueueSnackbar(`${translate('addError')}`, { variant: 'error' });
    }
  };


  const handleRemoveFile = () => {
    setValue('images', []);
  };
  
 

  const handleRemoveAllFiles = () => {
    setValue('images', []);
  };
  return {
    handleDrop,
    handleRemoveFile,
    handleRemoveAllFiles,
    onUpload,
    handleSubmitCategory,
    isLoading,
    file,
    setFile,
  };
};
