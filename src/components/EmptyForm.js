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
        marginLeft: "50px",
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '22ch',
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
                <Typography style={{textAlign: "center"}} >
                    Select the fields for your new form!
                </Typography>
                {defaultFields.map((defaultField)=><Field label={defaultField.label} disabled={true} field={defaultField}/>)}

            </div>
            <div className={classes.formContainer}>
                <form id="empty">
                    <Typography style={{ textAlign: "center" }} >
                        {formTitle}
                    </Typography>
                    <Typography style={{ textAlign: "center" }} >
                        {formDesc}
                    </Typography>
                    <TextField onChange={handleFormTitle} id="form-title" label="Form Title" defaultValue={formTitle} />
                    <TextField onChange={handleFormDesc} id="form-desc" label="Form Description" defaultValue={formDesc}/>
                    {fields.map((field)=><Field field={field}/>)}
                </form>
            </div>
        </div>
    )
}
