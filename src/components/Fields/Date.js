import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Date({ field, disabled, label, required, setFieldValue, formFieldId }) {
    const handleInput = async (e) => {
        if (setFieldValue !== undefined) {
            setFieldValue({ [formFieldId]: { question: label, response: e.target.value } });
        }
    };
    if (setFieldValue !== undefined) {
        return (
            <TextField
                required={required}
                disabled={disabled}
                autoComplete="off"
                id={field.id}
                label={label}
                placeholder="2020-01-27"
                onBlur={handleInput}
            />
        )
    } else {
        return (
            <TextField
                required={required}
                disabled={disabled}
                autoComplete="off"
                id={field.id}
                label={label}
                defaultValue="2020-01-27"
            />
        )
    }
}
