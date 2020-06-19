import React from 'react';
import SingleLineText from './Fields/SingleLineText';
import MultiLineText from "./Fields/MultiLineText";
import Number from "./Fields/Number";
import Date from "./Fields/Date";
import Time from "./Fields/Time";

export default function Field({field}){
    switch (field.type) {
        case "singleText":
            return<SingleLineText/>
        case "multiText":
            return <MultiLineText/>
        case "number":
            return <Number/>
        case "date":
            return <Date/>
        case "time":
            return <Time/>
        default:
            return null;
    }
}
