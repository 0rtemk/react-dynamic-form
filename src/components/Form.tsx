import { FC, useCallback } from "react";
import useStore from "./store";
import Group from "./Group";

const Form: FC = () => {
    const { fieldValues } = useStore();

    const handleSubmit = useCallback(() => {
        for (const groupName in fieldValues) {
            const fields = fieldValues[groupName];
            for (const fieldKey in fields) {
                console.log(`Группа ${groupName} | поле ${fieldKey} | значение ${fields[fieldKey]}`);
            }
        }
    }, [fieldValues]);


    return (
        <div>
            <Group depth={0} groupName="1" />
            <button className="send-form-btn" onClick={handleSubmit}>Отправить форму</button>
        </div>
    );
};

export default Form;
