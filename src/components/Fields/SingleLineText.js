import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function SingleLineText({field, disabled, label, required}){
    return (
        <TextField
        required={required}
        disabled={disabled}
        id={field.id}
        label={label}
        autoComplete="off"
        defaultValue="Text input..."
        />
    )
}
