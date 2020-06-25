import React, {useState} from "react";
import MuiEditableLabel from "mui-editable-label";

export default function EditableLabel({index, field, label, setFieldLabel, setLabelUpdated}){
    const [text, setText] = useState(label);
    // const handleLabelChange = async (e)=> {
    //     if (text !== label) {
    //         setLabelUpdated(true);
    //         setFieldLabel()
    //     }
    // }
    return (
        <MuiEditableLabel
            initialValue={text}
            onFocus={value => value}
            onBlur={value => {
                setText(value);
                if (text !== value) {
                    setFieldLabel({index:index, field:field, newLabel:value})
                    setLabelUpdated(true);
                }
            }}
        />
    )
}
