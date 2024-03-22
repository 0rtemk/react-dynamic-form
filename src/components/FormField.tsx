import { ChangeEvent, FC, useCallback } from "react";
import useStore from "./store";

interface FormFieldProps {
    name: string;
    onChange: (value: string) => void;
}

const FormField: FC<FormFieldProps> = ({ name, onChange }) => {
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        useStore.getState().fieldValues[name];
        onChange(e.target.value);
    }, [name]);

    return <input name={name} type="text" onChange={handleChange} />;
};

export default FormField;