import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//Field Imports
import SingleLineText from './Fields/SingleLineText';
import MultiLineText from "./Fields/MultiLineText";
import Number from "./Fields/Number";
import Date from "./Fields/Date";
import Time from "./Fields/Time";
const useStyles = makeStyles((theme)=>({
    root: {
        display: "flex",
        flexDirection: "row",
        margin: "10px",
        justifyContent: "center",
    },
    fieldContainer: {
        backgroundColor: "#90caf9",
        display: "flex",
        flexDirection: "column",
        height: "700px",
        width: "450px",
        borderRadius: "15px",
        margin: "15px",
        marginRight: "50px",
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '22ch',
        }

    },
    formContainer: {
        backgroundColor: "#ffe0b2",
        display: "flex",
        flexDirection: "column",
        height: "700px",
        width: "450px",
        borderRadius: "15px",
        margin: "15px",
        marginLeft: "50px"
    },
}))

export default function EmptyForm(){
    const {fields, setFields} = useState([]);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.fieldContainer}>
                <Typography style={{textAlign: "center"}} >
                    Fields will go here
                </Typography>
                <SingleLineText/>
                <MultiLineText/>
                <Number/>
                <Date/>
                <Time/>

            </div>
            <div className={classes.formContainer}>
                <form id="empty">
                    <Typography style={{ textAlign: "center" }} >
                        Empty Form goes here
                    </Typography>
                </form>
            </div>
        </div>
    )
}
