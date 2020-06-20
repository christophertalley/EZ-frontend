import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function SingleLineText({disabled, label}){
    return (
        <TextField
        disabled={disabled}
        id="field-1"
        label={label}
        defaultValue="Text input..." />
    )
}
