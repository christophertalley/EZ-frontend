import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function SingleLineText({field, disabled, label, required, setFieldValue}){
    const handleInput = async (e) => {
        setFieldValue({question: label, response: e.target.value});
    };
    return (
        <TextField
        required={required}
        disabled={disabled}
        id={field.id}
        label={label}
        autoComplete="off"
        defaultValue="Text input..."
        onChange={handleInput}
        />
    )
}
