import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function MultiLineText({label, disabled}) {
    return (
        <TextField
        disabled={disabled}
        autoComplete={false}
        multiline
        id="field-2"
        label={label}
        defaultValue="Text input for longer lines of text when you need extra space!"
        rows={2}
        rowsMax={5} />
    )
}
