import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Date() {
    return (
        <TextField
        disabled
        id="date-field"
        label="Date Field"
        defaultValue="2020-01-27"
        />
    )
}
