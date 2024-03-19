import { create } from 'zustand';
import { produce } from 'immer';

interface FieldValues {
    [fieldName: string]: string;
}

interface FormState {
    fieldValues: { [groupName: string]: FieldValues };
    addFieldValue: (groupName: string, fieldName: string, value: string) => void;
}

const useStore = create<FormState>((set) => ({
    fieldValues: {},
    addFieldValue: (groupName, fieldName, value) => set(produce((state) => {
        if (!state.fieldValues[groupName]) {
            state.fieldValues[groupName] = {};
        }
        state.fieldValues[groupName][fieldName] = value;
    })),
}));

export default useStore;
