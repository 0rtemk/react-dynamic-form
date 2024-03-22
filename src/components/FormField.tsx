import { ChangeEvent, FC, useCallback } from "react";
import useStore from "./store";
import { TextField, InputAdornment } from '@mui/material';

interface FormFieldProps {
    id: string;
    index: number;
    onChange: (value: string) => void;
}

const FormField: FC<FormFieldProps> = ({ id, index, onChange }) => {
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        useStore.getState().fieldValues[index];
        onChange(e.target.value);
    }, [id, index, onChange]);

    return <TextField 
        id={id} 
        label='textfield'
        variant="outlined" 
        onChange={handleChange}
        size="small"
        sx={{
            m: "5px",
            width: 320,
            height: 'auto',
        }}
        InputProps = {{
            startAdornment: <InputAdornment position="start">{`label ${index}:`}</InputAdornment>,
        }}
    />;
};

export default FormField;