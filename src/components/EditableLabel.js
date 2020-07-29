import React, {useState} from "react";
import MuiEditableLabel from "mui-editable-label";
import "../styles/index.css"

export default function EditableLabel({index, field, label, setFieldLabel, setLabelUpdated}){
    const clickableLabel = `${label} (CLICK TO EDIT)`
    const [text, setText] = useState(clickableLabel);
    // const handleLabelChange = async (e)=> {
    //     if (text !== label) {
    //         setLabelUpdated(true);
    //         setFieldLabel()
    //     }
    // }
    return (
        <MuiEditableLabel
            className="edit-label"
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
