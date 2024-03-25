import { FC, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import useStore from "./store";
import Group from "./Group";
import { Box, Button } from '@mui/material';
import Send from '@mui/icons-material/Send';

const Form: FC = () => {
    const formMethods = useForm()
    const { handleSubmit, control, formState: { errors } } = formMethods;
    const isDisplay = useStore(state => state.isDisplay);
    const setIsDisplay = useStore(state => state.setIsDisplay);

    const onSubmit = useCallback((data: object) => {
        Object.entries(data).forEach(([key, value]) => {
            const [groupName, field] = key.split('_');
            console.log(`Группа ${groupName} | поле ${field} | значение: "${value}"`);
        });
    }, []);

    return (
        <FormProvider {...formMethods}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Group depth={0} groupName="1" control={control} errors={errors} />
                    <Button
                        variant="outlined"
                        type="submit"
                        endIcon={<Send />}
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
            </Box>
        </FormProvider>
    );
};

export default Form;