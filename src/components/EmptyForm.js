import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Field from './Field';
import fieldData from "./FieldData";
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme)=>({
    root: {
        display: "flex",
        flexDirection: "row",
        margin: "10px",
        justifyContent: "center",
        '& label.Mui-focused': {
            color: '#ff5252',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#ff5252',
        },
        '&:hover fieldset': {
            borderBottomColor: "#ff5252"
        }
    },
    fieldContainer: {
        color: "beige",
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
            width: '35ch',
            border: "1px solid grey",
            borderRadius: "5px",
            padding: "5px",
            backgroundColor: "#fff3e0"

        },
    },
    fieldBox: {
        display:"flex",
        flexDirection:"column",
        alignItems: "center"
    },
    formContainer: {
        color: "#0277bd",
        backgroundColor: "#ffe0b2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "700px",
        width: "450px",
        borderRadius: "15px",
        margin: "15px",
        marginLeft: "50px",
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '35ch',
            border: "1px solid grey",
            borderRadius: "5px",
            padding: "5px",
            backgroundColor: "#e3f2fd"
        }
    },
}))

export default function EmptyForm(){
    const [defaultFields, setDefaultFields] = useState(fieldData.fields);
    const [ fields, setFields ] = useState([]);
    const [formTitle, setFormTitle] = useState('Untitled Form');
    const [formDesc, setFormDesc] = useState('This is a form to...');
    const handleFormTitle = async (e)=> {
        setFormTitle(e.target.value);
    }
    const handleFormDesc = async(e)=> {
        setFormDesc(e.target.value);
    }


    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.fieldContainer}>
                <Typography variant="h3" style={{ textAlign: "center", fontSize: "25px", padding:"12px"}} >
                    Default Fields
                </Typography>
                <Typography style={{ textAlign: "center" }} >
                    Select the fields for your form.

                </Typography>
                <div className={classes.fieldBox}>
                    {defaultFields.map((defaultField)=><Field label={defaultField.label} disabled={true} field={defaultField}/>)}
                </div>

            </div>
            <div className={classes.formContainer}>
                <form id="empty">
                    <Typography variant="h3" style={{ textAlign: "center", fontSize:"25px", padding:"12px"}} >
                        {formTitle}
                    </Typography>
                    <Typography style={{ textAlign: "center" }} >
                        {formDesc}
                    </Typography>
                    <div className={classes.fieldBox}>
                        <TextField
                        onChange={handleFormTitle}
                        required
                        id="form-title"
                        label="Form Title"
                        autoComplete="off"
                        defaultValue={formTitle} />
                        <TextField
                        multiline
                        onChange={handleFormDesc}
                        id="form-desc"
                        label="Form Description"
                        rows={2}
                        rowsMax={5}
                        autoComplete="off"
                        defaultValue={formDesc}/>
                        {fields.map((field)=><Field field={field}/>)}
                    </div>
                </form>
            </div>
        </div>
    )
}
