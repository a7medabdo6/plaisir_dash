import React, { useState } from 'react';

import PropTypes from 'prop-types';
// @mui
import { Stack, InputAdornment, TextField, OutlinedInput, Button } from '@mui/material';
// components
import SearchIcon from '@mui/icons-material/Search'; // Importing the MUI Search icon
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DateRangeIcon from '@mui/icons-material/DateRange';  // استيراد أيقونة التاريخ
import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

UserTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterName: PropTypes.string,
  filterRole: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterRole: PropTypes.func,
  onResetFilter: PropTypes.func,
  optionsRole: PropTypes.arrayOf(PropTypes.string),
};

export default function UserTableToolbar({
  isFiltered,
  filterName,
  filterRole,
  optionsRole,
  onFilterName,
  onFilterRole,
  onResetFilter,
}) {
  const { translate } = useLocales();
  const [filterEndDate, setFilterEndDate] = useState(null);

  const onFilterEndDate = (date) => {
    setFilterEndDate(date);
  };
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
  


      <DatePicker
        selected={filterEndDate}
        onChange={onFilterEndDate}
        placeholderText="Start Date"
        dateFormat="MM/dd/yyyy"
        customInput={
          <OutlinedInput
            sx={{ width: '300px' }}  // عرض المدخل
            startAdornment={  // إضافة الأيقونة إلى بداية المدخل
              <InputAdornment position="start">
                <DateRangeIcon sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
          />
        }
      />
      <DatePicker
        selected={filterEndDate}
        onChange={onFilterEndDate}
        placeholderText="End Date"
        dateFormat="MM/dd/yyyy"
        customInput={
          <OutlinedInput
            sx={{ width: '300px' }}  // عرض المدخل
            startAdornment={  // إضافة الأيقونة إلى بداية المدخل
              <InputAdornment position="start">
                <DateRangeIcon sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
          />
        }
      />


      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder={`${translate('category.search')}`}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          {`${translate('category.Clear')}`}

        </Button>
      )}
    </Stack>
  );
}
