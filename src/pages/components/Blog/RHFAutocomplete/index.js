import React from 'react'; // تأكد من استيراد React
import PropTypes from 'prop-types';
// @mui
import { Autocomplete, TextField, Chip } from '@mui/material';

// ----------------------------------------------------------------------

RHFAutocomplete.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.node,
    options: PropTypes.array.isRequired, // تأكد من أن الخيارات متاحة
    onChange: PropTypes.func, // لإرسال البيانات إلى المكون الأب
    selectedOptions:PropTypes.array,
    setSelectedOptions:PropTypes.func
};

export default function RHFAutocomplete({ name, label,setSelectedOptions,selectedOptions, helperText, options, onChange, ...other }) {

    // التعامل مع تغييرات الاختيار
    const handleChange = (event, newValue) => {
        // إضافة العناصر الجديدة إلى العناصر القديمة
        setSelectedOptions((prevState) => [
            ...prevState,
            ...newValue.filter((newItem) => !prevState.some((item) => item.id === newItem.id)), // تجنب إضافة العناصر المتكررة
        ]);

        // تمرير البيانات إلى المكون الأب إذا كان `onChange` موجودًا
        if (onChange) {
            onChange(newValue); // إرسال العناصر المختارة إلى المكون الأب
        }
    };

    // تصفية العناصر المختارة من القائمة المتاحة
    const filteredOptions = options?.filter(
        (option) => option?.id && !selectedOptions.some((selected) => selected?.id === option?.id)
    );

    return (
        <div>
            <Autocomplete
                multiple
                freeSolo
                onChange={handleChange}
                options={filteredOptions}
                getOptionLabel={(option) => option?.title_en || option?.title_ar || ''}
                renderInput={(params) => (
                    <TextField
                        label={label}
                        error={false} // يمكنك إضافة تحقق من الأخطاء هنا إذا لزم الأمر
                        helperText={helperText}
                        {...params}
                    />
                )}
                renderTags={(value, getTagProps) => {
                    return value.map((option, index) => {
                        return (
                            <Chip
                                label={option?.title_en || option?.title_ar || 'بديل'}
                                {...getTagProps({ index })}
                                key={index}
                            />
                        );
                    });
                }}
                {...other}
            />
        </div>
    );
}
