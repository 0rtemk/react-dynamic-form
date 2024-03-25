import { FC, useState, useCallback } from "react";
import FormField from "./FormField";
import useStore from "./store";
import ArrowDown from "../images/arrow-down.svg";
import { Box, ButtonGroup, Button } from '@mui/material';
import { AccountTree, TextFields } from '@mui/icons-material';
import { Control, FieldErrors } from 'react-hook-form';

interface GroupProps {
    depth: number;
    groupName: string;
    control: Control; // Указываем Control из react-hook-form без дженериков
    errors: FieldErrors;  // Указываем тип ошибок
}

interface GroupProps {
    depth: number;
    groupName: string;
}

const Group: FC<GroupProps> = ({ depth, groupName, control, errors }) => {
    const [fieldKeys, setFieldKeys] = useState<string[]>([]);
    const [subGroupNames, setSubGroupNames] = useState<string[]>([]);
    const { isDisplay } = useStore();


    const createField = useCallback(() => {
        const fieldKey = `${fieldKeys.length}`;
        setFieldKeys((prevKeys) => [...prevKeys, fieldKey]);
    }, [fieldKeys, groupName]);

    const createSubGroup = useCallback(() => {
        const newGroupName = `${groupName}-${subGroupNames.length + 1}`;
        setSubGroupNames((prevNames) => [...prevNames, newGroupName]);
    }, [groupName, subGroupNames]);

    return (
        <Box>
            {depth !== 0 && <Box component="img" className="img-arrow" src={ArrowDown} alt=""/>}
            <Box
                height={'auto'}
                minWidth={310}
                p={1}
                mx={1}
                sx={{
                    border: fieldKeys.length ? '2px solid grey' : '1px dashed grey',
                    borderRadius: fieldKeys.length ? '10px' : '0',
                    boxShadow: 3,
                }}>

                {isDisplay && 
                    <Box textAlign={'start'} fontSize={'10px'}>{`Группа: ${groupName}`}</Box>
                }

                {fieldKeys.map((key, index) => (
                    <Box key={key}>
                        <FormField name={`${groupName}_${key}`} index={index} control={control} errors={errors} />
                    </Box>
                ))}

                {isDisplay && 
                    <ButtonGroup
                        variant="outlined"
                        sx={{ m: '10px' }}>
                        <Button
                            sx={{ m: 0, px: 1, color: 'black', borderColor: 'black' }}
                            onClick={createField}
                            endIcon={<TextFields />}>Создать поле</Button>
                        <Button
                            sx={{ m: 0, px: 1, color: 'black', borderColor: 'black' }}
                            onClick={createSubGroup}
                            endIcon={<AccountTree />}>Создать группу</Button>
                    </ButtonGroup>
                }
            </Box>
            <Box display="flex">
                {subGroupNames.map((name, index) => (
                    <Group key={`group-${index}`} depth={depth + 1} groupName={name} control={control} errors={errors} />
                ))}
            </Box>
        </Box>
    );
};

export default Group;