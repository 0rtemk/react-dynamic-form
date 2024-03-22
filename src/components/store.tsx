import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface FieldValues {
    [fieldName: string]: string;
}

interface FormState {
    fieldValues: { [groupName: string]: FieldValues };
    addFieldValue: (groupName: string, fieldName: string, value: string) => void;
}

const useStore = create<FormState> () (immer((set) => ({
    fieldValues: {},
    addFieldValue: (groupName, fieldName, value) => {

        set((state) => {
            if (!state.fieldValues[groupName]) {
                state.fieldValues[groupName] = { [fieldName]: value };
            }
            state.fieldValues[groupName][fieldName] = value;

        });
    },
})));

export default useStore;