import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Time(){
    return (
        <TextField
            id="time-field"
            disabled
            label="Time Field"
            type="time"
            defaultValue="07:30"
            inputProps={{
                step: 300, // 5 min
            }}
        />
    )
}
