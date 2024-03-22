import { FC, useState, useCallback } from "react";
import FormField from "./FormField";
import useStore from "./store";
import ArrowDown from "../images/arrow-down.svg";
import { Box, ButtonGroup, Button } from '@mui/material';
import { AccountTree, TextFields } from '@mui/icons-material';

interface GroupProps {
    depth: number;
    groupName: string;
}

const Group: FC<GroupProps> = ({ depth, groupName }) => {
    const [fieldKeys, setFieldKeys] = useState<string[]>([]);
    const [subGroupNames, setSubGroupNames] = useState<string[]>([]);
    const { addFieldValue } = useStore();

    const createField = useCallback(() => {
        const fieldKey = `${fieldKeys.length}`;
        setFieldKeys((prevKeys) => [...prevKeys, fieldKey]);
        addFieldValue(groupName, fieldKey, '');
    }, [fieldKeys, groupName]);

    const createSubGroup = useCallback(() => {
        const newGroupName = `${groupName}.${subGroupNames.length + 1}`;
        setSubGroupNames((prevNames) => [...prevNames, newGroupName]);
    }, [groupName, subGroupNames]);

    const handleFieldChange = useCallback((key: string, value: string) => {
        addFieldValue(groupName, key, value);
    }, []);

    return (
        <Box>
            {depth !== 0 && <img className="img-arrow" src={ArrowDown} alt="" />}
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
                <Box textAlign={'start'} fontSize={'10px'}>{`Группа: ${groupName}`}</Box>
                {fieldKeys.map((key, index) => (
                    <Box key={key}>
                        <FormField id={`${groupName}-${key}`} index={index} onChange={(value) => handleFieldChange(key, value)} />
                    </Box>
                ))}
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
            </Box>
            <Box display="flex">
                {subGroupNames.map((name, index) => (
                    <Group key={`group-${index}`} depth={depth + 1} groupName={name} />
                ))}
            </Box>
        </Box>
    );
};

export default Group;