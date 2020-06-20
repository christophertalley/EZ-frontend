import React from 'react';
import SingleLineText from './Fields/SingleLineText';
import MultiLineText from "./Fields/MultiLineText";
import Number from "./Fields/Number";
import Date from "./Fields/Date";
import Time from "./Fields/Time";

export default function Field({props}){
    const { field, label, disabled } = props;
    switch (field.type) {
        case "singleText":
            return<SingleLineText label={label} disabled={disabled}/>
        case "multiText":
            return <MultiLineText label={label} disabled={disabled}/>
        case "number":
            return <Number label={label} disabled={disabled}/>
        case "date":
            return <Date label={label} disabled={disabled}/>
        case "time":
            return <Time label={label} disabled={disabled}/>
        default:
            return null;
    }
}
