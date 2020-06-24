import React, {useState} from "react";
import MuiEditableLabel from "mui-editable-label";

export default function EditableLabel({field, label, setFieldLabel, setLabelUpdated}){
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
            onFocus={value => console.log("on focus: ", value)}
            onBlur={value => {
                console.log("on blur: ", value);
                setText(value);
                if (text !== value) {
                    setFieldLabel({field:field, newLabel:value})
                    setLabelUpdated(true);
                }
            }}
        />
    )
}
