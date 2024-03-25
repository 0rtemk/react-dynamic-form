import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface FormState {
    isDisplay: boolean;
    setIsDisplay: () => void;
}

const useStore = create<FormState> () (immer((set) => ({
    isDisplay: true,
    setIsDisplay: () => {set((state) => {state.isDisplay = !state.isDisplay})}
})));

export default useStore;