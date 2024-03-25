import { FC } from "react";
import { TextField, InputAdornment } from '@mui/material';
import { Controller, Control, FieldErrors } from "react-hook-form";

interface FormFieldProps {
    name: string;
    index: number;
    control: Control; 
    errors: FieldErrors; 
}

const FormField: FC<FormFieldProps> = ({ name, index, control, errors }) => {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue=''
            rules={{ required: "Это поле обязательно к заполнению" }} 
            render={({ field }) => (
                <TextField 
                    {...field} 
                    label='textfield'
                    variant="outlined"
                    error={!!errors[name]}
                    helperText={errors[name]?.message as string}
                    size="small"
                    sx={{
                        m: "5px",
                        width: 320,
                        height: 'auto',
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{`label ${index}:`}</InputAdornment>,
                    }}
                />
            )}
        />
    );
};

export default FormField;