import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function MultiLineText({label, disabled}) {
    return (
        <TextField
        disabled={disabled}
        multiline
        id="field-2"
        label={label}
        defaultValue="Text input for multiple lines..."
        rows={2}
        rowsMax={5} />
    )
}
