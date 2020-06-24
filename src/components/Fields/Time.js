import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Time({ field, disabled, label, required }){
    return (
        <TextField
            id={field.id}
            required={required}
            disabled={disabled}
            label={label}
            type="time"
            autoComplete="off"
            defaultValue="07:30"
            inputProps={{
                step: 300, // 5 min
            }}
        />
    )
}
