import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Field from './Field';
import fieldData from "./FieldData";
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
    const {defaultFields, setDefaultFields} = useState([fieldData.fields]);
    const { fields, setFields } = useState([]);

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.fieldContainer}>
                <Typography style={{textAlign: "center"}} >
                    Fields will go here
                </Typography>
                {fieldData.fields.map((defaultField)=>{
                    return (
                        <Field field={defaultField}/>
                    )
                })}

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
