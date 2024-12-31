import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Box,
  Chip,
  Select,
  Checkbox,
  MenuItem,
  OutlinedInput,
  FormHelperText,
  FormControl,
  InputLabel,
} from '@mui/material';

RHFMultiSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  chip: PropTypes.bool,
  placeholder: PropTypes.string,
  helperText: PropTypes.node,
  sx: PropTypes.object,
  checkbox: PropTypes.bool,
};

export function RHFMultiSelect({
  name,
  label,
  options = [],
  chip,
  placeholder,
  helperText,
  sx,
  checkbox,
  ...other
}) {
  const { control } = useFormContext();

  const renderValues = (selected) => {
    const selectedItems = options.filter((item) => selected.includes(item.value));

    if (!selectedItems.length && placeholder) {
      return <Box component="em" sx={{ color: 'text.disabled' }}>{placeholder}</Box>;
    }

    if (chip) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selectedItems.map((item) => (
            <Chip key={item.value} size="small" label={item.label} />
          ))}
        </Box>
      );
    }
    return selectedItems.map((item) => item.label).join(', ');
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl sx={sx} error={!!error}>
          {label && <InputLabel id={name}>{label}</InputLabel>}
          <Select
            value={field.value || []}  // تأكد أن القيمة الافتراضية مصفوفة

            {...field}
            multiple
            displayEmpty={!!placeholder}
            labelId={name}
            input={<OutlinedInput label={label} />}
            renderValue={renderValues}
            MenuProps={{
              PaperProps: {
                sx: { px: 1, maxHeight: 280 },
              },
            }}
            {...other}
          >
            {options.map((option) => {
  const selected = Array.isArray(field.value) ? field.value.includes(option.value) : false;

  return (
    <MenuItem
      key={option.value}
      value={option.value}
      sx={{
        py: 1,
        px: 2,
        borderRadius: 0.75,
        typography: 'body2',
        ...(selected && {
          fontWeight: 'fontWeightMedium',
        }),
        ...(checkbox && {
          p: 0.25,
        }),
      }}
    >
      {checkbox && <Checkbox disableRipple size="small" checked={selected} />}
      {option.label}
    </MenuItem>
  );
})}

          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
