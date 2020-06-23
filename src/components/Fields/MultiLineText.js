import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function MultiLineText({field, label, disabled, required}) {
    return (
        <TextField
        required={required}
        disabled={disabled}
        autoComplete="off"
        multiline
        id={field.id}
        label={label}
        defaultValue="Text input for longer lines of text when you need extra space!"
        rows={2}
        rowsMax={5} />
    )
}
