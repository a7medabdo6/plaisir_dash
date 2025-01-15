import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText, Stack, Typography } from '@mui/material';
//
import { UploadAvatar, Upload, UploadBox } from '../upload';
import UploadHomeContent from '../upload/UploadHomeContent';

// ----------------------------------------------------------------------

RHFUploadAvatar.propTypes = {
  name: PropTypes.string,
};

// ----------------------------------------------------------------------

export function RHFUploadAvatar({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <UploadAvatar
            accept={{
              'image/*': [],
            }}
            error={!!error}
            file={field.value}
            {...other}
          />

          {!!error && (
            <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}

// ----------------------------------------------------------------------

RHFUploadBox.propTypes = {
  name: PropTypes.string,
};

export function RHFUploadBox({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UploadBox files={field.value} error={!!error} {...other} />
      )}
    />
  );
}

// ----------------------------------------------------------------------

RHFUpload.propTypes = {
  name: PropTypes.string,
  multiple: PropTypes.bool,
  isLoading: PropTypes.bool,
  helperText: PropTypes.node,
};

export function RHFUpload({ name, multiple,isLoading, helperText, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        multiple ? (
          <Upload
            multiple
            accept={{ 'image/*': [] }}
            files={field?.value}
            isLoading={isLoading}

            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        ) : (
          <Upload
            accept={{ 'image/*': [] }}
            file={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        )
      }
    />
  );
}


RHFUploadWithLabel.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue:PropTypes.string,
  newValue:PropTypes.string,
  isLoading: PropTypes.bool,

  multiple: PropTypes.bool,
  helperText: PropTypes.node,
};

export function RHFUploadWithLabel({ name, multiple, label, helperText,defaultValue,isLoading,newValue, ...other }) {
  const { control } = useFormContext();

  return (
    <Stack>
      <Typography>
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          // إذا كانت multiple يتم تمرير المصفوفة كما هي
          const files = Array.isArray(field?.value) ? field?.value : (field?.value ? [field.value] : []);

          return multiple ? (
            
            <UploadHomeContent
              multiple
              accept={{ 'image/*': [] }}
              files={files}
              newValue={newValue}
              error={!!error}
              isLoading={isLoading}
              helperText={
                (!!error || helperText) && (
                  <FormHelperText error={!!error} sx={{ px: 2 }}>
                    {error ? error?.message : helperText}
                  </FormHelperText>
                )
              }
              {...other}
            />
          ) : (
            <UploadHomeContent
              accept={{ 'image/*': [] }}
              file={field.value}
              error={!!error}
              helperText={
                (!!error || helperText) && (
                  <FormHelperText error={!!error} sx={{ px: 2 }}>
                    {error ? error?.message : helperText}
                  </FormHelperText>
                )
              }
              {...other}
            />
          );
        }}
      />
    </Stack>
  );
}
