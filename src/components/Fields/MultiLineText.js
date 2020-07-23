import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function MultiLineText({ field, label, disabled, required, setFieldValue, formFieldId}) {
    const handleInput = async (e) => {
        setFieldValue({ [formFieldId]: { question: label, response: e.target.value } });
    };
    if (setFieldValue !== undefined) {
        return (
            <TextField
            required={required}
            disabled={disabled}
            autoComplete="off"
            multiline
            id={field.id}
            label={label}
            placeholder="Text input for longer lines of text when you need extra space!"
            rows={2}
            rowsMax={5}
            onBlur={handleInput} />
        )
    } else {
        return (
            <TextField
                required={required}
                disabled={disabled}
                autoComplete="off"
                multiline
                id={field.id}
                label={label}
                placeholder="Text input for longer lines of text when you need extra space!"
                rows={2}
                rowsMax={5}
                onBlur={handleInput} />
        )
    }

}
