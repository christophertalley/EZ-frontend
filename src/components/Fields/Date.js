import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Date({ disabled, label }) {
    return (
        <TextField
        disabled={disabled}
        autoComplete={false}
        id="field-4"
        label={label}
        defaultValue="2020-01-27"
        />
    )
}
