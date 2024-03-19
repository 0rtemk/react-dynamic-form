import { useState } from "react";
import ArrowDown from "../images/arrow-down.svg";
import useStore from "./store";

interface GroupProps {
    depth: number;
    groupName: string;
    onAddGroup: (name: string) => void;
}

const Group: React.FC<GroupProps> = ({ depth, groupName, onAddGroup }) => {
    const [fields, setFields] = useState<JSX.Element[]>([]);
    const [subGroups, setSubGroups] = useState<JSX.Element[]>([]);
    const { addFieldValue } = useStore();

    const createFields = () => {
        const fieldKey = `${fields.length}`;
        setFields([...fields, <FormField key={fieldKey} onChange={(value) => addFieldValue(groupName, fieldKey, value)} />]);
    };

    const createSubGroup = () => {
        const newGroupName = `${groupName}.${subGroups.length + 1}`;
        setSubGroups([...subGroups,
            <Group key={`group-${subGroups.length}`}
                   depth={depth + 1}
                   groupName={newGroupName}
                   onAddGroup={onAddGroup} />
        ]);
        onAddGroup(newGroupName);
    };

    return (
        <div>
            {depth !== 0 && <img className="img-arrow" src={ArrowDown} alt="" />}
            <div className="bordered">
                <div className="group-name">{`Группа: ${groupName}`}</div>
                {fields.map((field, index) => (
                    <div key={index}><span>{index}</span>{field}</div>
                ))}
                <button onClick={createFields}>Создать поле</button>
                <button onClick={createSubGroup}>Создать группу</button>
            </div>
            <div className="form-container">
                {subGroups.map((group, index) => (
                    <div key={index}>{group}</div>
                ))}
            </div>
        </div>
    );
};

interface FormFieldProps {
    onChange: (value: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({ onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return <input type="text" onChange={handleChange} />;
};

const Form: React.FC = () => {
    const { fieldValues } = useStore();

    const handleSubmit = () => {
        for (const groupName in fieldValues) {
            const fields = fieldValues[groupName];
            for (const fieldKey in fields) {
                console.log(`Группа ${groupName} | поле ${fieldKey} | значение ${fields[fieldKey]}`);
            }
        }
    };

    return (
        <div>
            <Group depth={0} groupName="1" onAddGroup={() => {}} />
            <button className="send-form-btn" onClick={handleSubmit}>Отправить форму</button>
        </div>
    );
};

export default Form;
