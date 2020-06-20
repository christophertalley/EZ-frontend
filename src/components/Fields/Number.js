import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Number({ disabled, label }) {
    return (
        <TextField
        disabled={disabled}
        id="field-3"
        label={label}
        defaultValue={0}
        autoComplete={false}
        type="number"
        />
    )
}
