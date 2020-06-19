import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function MultiLineText() {
    return (
        <TextField
        disabled
        multiline
        id="field-2"
        label="Multi Line Text Field"
        defaultValue="Text input for multiple lines..."
        rows={2}
        rowsMax={5} />
    )
}
