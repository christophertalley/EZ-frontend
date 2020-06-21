import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Date({ field, disabled, label }) {
    return (
        <TextField
        disabled={disabled}
        autoComplete="off"
        id={field.id}
        label={label}
        defaultValue="2020-01-27"
        />
    )
}
