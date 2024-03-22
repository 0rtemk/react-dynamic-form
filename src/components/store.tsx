import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface FieldValues {
    [fieldName: string]: string;
}

interface FormState {
    fieldValues: { [groupName: string]: FieldValues };
    addFieldValue: (groupName: string, fieldName: string, value: string) => void;
    isDisplay: boolean;
    setIsDisplay: () => void;
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

    isDisplay: true,
    setIsDisplay: () => {set((state) => {state.isDisplay = !state.isDisplay})}

})));

export default useStore;