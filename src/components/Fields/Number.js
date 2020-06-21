import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Number({ field, disabled, label }) {
    return (
        <TextField
        disabled={disabled}
        id={field.id}
        label={label}
        defaultValue={0}
        autoComplete="off"
        type="number"
        />
    )
}
