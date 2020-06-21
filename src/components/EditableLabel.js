import React, {useState} from "react";
import MuiEditableLabel from "mui-editable-label";

export default function EditableLabel(){
    const [text, setText] = useState('Customize Label here...');
    return (
        <MuiEditableLabel
            initialValue={text}
            onFocus={value => console.log("on focus: ", value)}
            onBlur={value => {
                console.log("on blur: ", value);
                setText(value);
            }}
        />
    )
}
