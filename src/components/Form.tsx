import { FC, useCallback } from "react";
import useStore from "./store";
import Group from "./Group";
import { Box, Button } from '@mui/material';
import Send from '@mui/icons-material/Send';

const Form: FC = () => {
    const isDisplay = useStore(state => state.isDisplay);
    const setIsDisplay = useStore(state => state.setIsDisplay);

    const handleSubmit = useCallback(() => {
        const fieldValues = useStore.getState().fieldValues;

        for (const groupName in fieldValues) {
            const fields = fieldValues[groupName];
            for (const fieldKey in fields) {
                if(fields[fieldKey] !== '')
                    console.log(`Группа ${groupName} | поле ${fieldKey} | значение ${fields[fieldKey]}`);
            }
        }
    }, []);

    return (
        <Box>
            <Group depth={0} groupName="1" />
            <Button 
                variant="outlined" 
                endIcon={<Send />} 
                onClick={handleSubmit}
                sx={{
                    my: 2,
                    boxShadow: 3,
                }}
            >Отправить форму</Button>
            <Button 
                variant="outlined" 
                onClick={setIsDisplay}
                sx={{
                    ml: 2,
                    boxShadow: 3,
                }}
            >{isDisplay ? 'Скрыть кнопки' : 'Показать кнопки'}</Button>
        </Box>
    );
};

export default Form;
