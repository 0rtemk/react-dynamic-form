import { FC, useState, useCallback } from "react";
import FormField from "./FormField";
import useStore from "./store";
import ArrowDown from "../images/arrow-down.svg";

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
        <div>
            {depth !== 0 && <img className="img-arrow" src={ArrowDown} alt="" />}
            <div className="bordered">
                <div className="group-name">{`Группа: ${groupName}`}</div>
                {fieldKeys.map((key, index) => (
                    <div key={key}>
                        <span>{index}</span>
                        <FormField name={`${groupName}-${key}`} onChange={(value) => handleFieldChange(key, value)} />
                    </div>
                ))}
                <button onClick={createField}>Создать поле</button>
                <button onClick={createSubGroup}>Создать группу</button>
            </div>
            <div className="form-container">
                {subGroupNames.map((name, index) => (
                    <Group key={`group-${index}`} depth={depth + 1} groupName={name} />
                ))}
            </div>
        </div>
    );
};

export default Group;