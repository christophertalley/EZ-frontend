import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Time({ disabled, label }){
    return (
        <TextField
            id="field-5"
            disabled={disabled}
            label={label}
            type="time"
            defaultValue="07:30"
            inputProps={{
                step: 300, // 5 min
            }}
        />
    )
}
