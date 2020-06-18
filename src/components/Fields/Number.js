import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Number() {
    return (
        <TextField disabled
        id="number-field"
        label="Number field"
        defaultValue="#"
        type="number"
        />
    )
}
