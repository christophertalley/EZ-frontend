import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function Number({ field, disabled, label, required, setFieldValue, formFieldId }) {
    const handleInput = async (e) => {
        setFieldValue({ [formFieldId]: { question: label, response: e.target.value } });
    };
    if (setFieldValue !== undefined) {
        return (
            <TextField
            required={required}
            disabled={disabled}
            id={field.id}
            label={label}
            defaultValue={0}
            autoComplete="off"
            type="number"
            onBlur={handleInput}
            />
        )
    } else {
        return (
            <TextField
                required={required}
                disabled={disabled}
                id={field.id}
                label={label}
                defaultValue={0}
                autoComplete="off"
                type="number"
            />
        )
    }
}
