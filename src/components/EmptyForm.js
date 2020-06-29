import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DraggableEmptyField from './DraggableEmptyField';
import DraggableField from './DraggableField';
import fieldData from "./FieldData";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "../styles/empty-form.css";
import { useAuth0 } from "../react-auth0-spa";
import { api } from '../config';

// DND Imports
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
const useStyles = makeStyles((theme)=>({
    root: {
        display: "flex",
        flexDirection: "row",
        margin: "10px",
        justifyContent: "center",
        '& label.Mui-focused': {
            color: '#90caf9',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#90caf9',
        },
    },
    fieldContainer: {
        color: "beige",
        backgroundColor: "#8c94ef",
        display: "flex",
        flexDirection: "column",
        height: "800px",
        width: "600px",
        borderRadius: "15px",
        margin: "15px",
        marginRight: "50px",
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '40ch',
            border: "1px solid grey",
            borderRadius: "5px",
            padding: "5px",
            backgroundColor: "#fff3e0"

        },
        paddingBottom: "10px"
    },
    fieldBox: {
        display:"flex",
        flexDirection:"column",
        alignItems: "center",
        minHeight: "200px",
    },
    dropFieldBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "450px",
        minHeight: "400px",
        maxHeight: "450px",
        border: "3px dotted #bbdefb",
        borderRadius: "10px",
        overflowY: "auto",
        flexGrow: 1,
        padding: "10px",
        boxSizing: "border-box",

    },
    formContainer: {
        color: "#2196f3",
        backgroundColor: "#eacdab",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "800px",
        width: "600px",
        borderRadius: "15px",
        margin: "15px",
        marginLeft: "50px",
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '40ch',
            border: "2px solid #2196f3",
            borderRadius: "5px",
            padding: "5px",
            backgroundColor: "#e3f2fd"
        },
        paddingBottom: "10px"
    },
    indivFieldContainer: {
        display:"flex",
        justifyContent: "start",
        flexDirection: "column"
    },
    submitButton: {
        display: "flex",
        justifyContent: "center",
        '& .MuiButton-root': {
            color: "#90caf9",
            backgroundColor: "#ffffe4",
            opacity: 0.6
        },
        '& .MuiButton-root:hover': {
            opacity: 1.0
        },
        paddingTop: "20px"
    }
}))

export default function EmptyForm(){
    const { user, isAuthenticated, getTokenSilently, } = useAuth0();
    const classes = useStyles();
    const [redirect, setRedirect] = useState(false);
    const [formResId, setFormResId] = useState("");
    const [isRequiredCheck, setIsRequiredCheck ] = useState({});
    const [labelUpdated, setLabelUpdated] = useState(false);
    const [fieldLabel, setFieldLabel] = useState({});
    const [state, setState ] = useState(fieldData);
    const [emptyFormData, setEmptyFormData] = useState(null);
    // Use state was converting dndfields back to an object, so selectable fields
    // was an idea to store that in the state
    const selectableFields = [];
    const dndFields = state.columns["column-1"].fieldIds.map((fieldId) =>{
        selectableFields.push(state.fields[fieldId])
        return state.fields[fieldId]});
    const [defaultFields, setDefaultFields] = useState(selectableFields);
    // set fields for empty form
    const [ fields, setFields ] = useState([]);
    const [formTitle, setFormTitle] = useState('Untitled Form');
    const [formDesc, setFormDesc] = useState('This is a form to...');
    const handleFormTitle = async (e)=> {
        setFormTitle(e.target.value);
    }
    const handleFormDesc = async(e)=> {
        setFormDesc(e.target.value);
    }
    // DND HOOKS
    const handleDrop = (result)=> {
        const {destination, source, draggableId} = result;

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
                return
            }

        const start = state.columns[source.droppableId];
        const finish = state.columns[destination.droppableId];

        if (start === finish) {
            return
        }
        // Modifies a copy of data to store in new state
        const startFieldIds = Array.from(start.fieldIds);
        startFieldIds.splice(source.index);
        const finishFieldIds = Array.from(finish.fieldIds);
        finishFieldIds.splice(destination.index, 0, draggableId);

        // Updated fields slice of state
        const formFields = [...fields];
        formFields.splice(destination.index, 0, state.fields[draggableId]);
        setFields(formFields);
        const formFieldCount = Object.keys(state.formFields).length;
        const addedFieldId = `form-field-${formFieldCount + 1}`;
        const addedField = {
            ...state.fields[draggableId],
            id: addedFieldId,
        }

        const newFinish = {
            ...finish,
            fieldIds: finishFieldIds
        }
        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newFinish.id]: newFinish
            },
            formFields: {
                ...state.formFields,
                [addedFieldId]: addedField
            }
        }
        setState(newState);
        console.log('this',newState);

        setEmptyFormData(newState.formFields);

    }

    useEffect(()=> {
        const requiredChecker = ()=> {


            const {index, isRequired} = isRequiredCheck;
            if (isRequired){
                // const formFieldCount = Object.keys(state.formFields).length;
                const addedFieldId = `form-field-${index + 1}`;
                const newState = {
                    ...state,
                    formFields: {
                        ...state.formFields,
                        [addedFieldId]: {
                            ...state.formFields[addedFieldId],
                            options: ['required']
                        },

                    }
                }

                setState(newState);
                setEmptyFormData(newState.formFields);
                setIsRequiredCheck({});
            }
        }
        requiredChecker();
    }, [isRequiredCheck])


    useEffect(()=>{
        const labelChanger = ()=> {
            if ( labelUpdated && fieldLabel !== {}) {
                const {index, field, newLabel} = fieldLabel;
                // const formFieldCount = Object.keys(state.formFields).length;

                const addedFieldId = `form-field-${index + 1}`;
                console.log(addedFieldId)
                if (addedFieldId in state.formFields) {
                    const newState = {
                        ...state,
                        formFields: {
                            ...state.formFields,
                            [addedFieldId]: {
                                ...state.formFields[addedFieldId],
                                label: newLabel
                            }
                        }
                    }
                    setState(newState);
                    setEmptyFormData(newState.formFields);
                    setFieldLabel({});
                    setLabelUpdated(false);
                } else {
                    const newState = {
                        ...state,
                        formFields: {
                            ...state.formFields,
                            [addedFieldId]: {
                                id: addedFieldId,
                                type: field.type,
                                label: newLabel,
                                options: field.options
                            }
                        }
                    }
                    setState(newState);
                    setEmptyFormData(newState.formFields);
                    setFieldLabel({});
                    setLabelUpdated(false);
                }
            }
        }
        labelChanger();
    },[labelUpdated])

    useEffect(() => {

        console.log('form data',emptyFormData);
    }, [state]);

    const createNewForm = async (e) => {
        e.preventDefault();


        if (emptyFormData === null){
            alert('You need to add a field first!')
        } else {
            if (isAuthenticated) {
            const token = await getTokenSilently();

            const body = {
                title: formTitle,
                desc: formDesc,
                formData: emptyFormData,
                userId:user.userId
            };

            try {
                const res = await fetch(`${api}/forms`, {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                const result = await res.json();
                const route = `/form/${result.formId}`;
                setFormResId(result.formId);
                setRedirect(true);
            } catch (e) {
                console.error(e)
            }}
        }


    }
    if (redirect) {
        return (
            <Redirect
                push
                to={{
                    pathname: `/form/${formResId}`,
                }}
            />
        )
    }
    return (
        <div className={classes.root}>
            <DragDropContext onDragEnd={handleDrop}>
                <div className={classes.fieldContainer}>
                    <Typography variant="h3" style={{ fontFamily: "'Roboto Mono', monospace", textAlign: "center", fontSize: "25px", padding:"12px"}} >
                        Default Fields
                    </Typography>
                    <Typography style={{ fontFamily: "'Roboto Mono', monospace", textAlign: "center" }} >
                        Select the fields for your form.

                    </Typography>
                    <Droppable
                    droppableId={state.columns["column-1"].id}
                    >
                    {provided=> {
                        return (
                            <div
                                className={classes.fieldBox}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {defaultFields.map((defaultField, index)=> {
                                    const defaultFieldProps = {field: defaultField, disabled:true, index:index, label:defaultField.label};
                                    return <DraggableEmptyField key={defaultField.id} props={defaultFieldProps}/>
                                    })}
                                {provided.placeholder}
                            </div>
                        )
                    }}
                    </Droppable>
                    <Typography style={{ paddingTop: "30px", fontSize: "20px",fontFamily: "'Roboto Mono', monospace", textAlign: "center" }} >
                        More fields coming soon!

                    </Typography>

                </div>
                <div className={classes.formContainer}>
                    <form onSubmit={createNewForm} id="empty">
                        <Typography variant="h3" style={{ fontFamily: "'Roboto Mono', monospace", textAlign: "center", fontSize:"25px", padding:"12px"}} >
                            {formTitle}
                        </Typography>
                        <Typography style={{ fontFamily: "'Roboto Mono', monospace",textAlign: "center" }} >
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
                            <Typography variant="h6" style={{ fontFamily: "'Roboto Mono', monospace", textAlign: "center", fontWeight: "light" }} >
                                Drop and customize your fields here!
                        </Typography>
                            <Droppable droppableId={state.columns["column-2"].id}>
                                {(provided)=>{
                                    return (
                                        <div
                                        key="field-container"
                                        id="drop-field-box"
                                        className={classes.dropFieldBox}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        >
                                            {fields.map((field, index)=>{
                                                const addedFieldProps = {
                                                    field: field,
                                                    disabled: false,
                                                    index: index,
                                                    setIsRequiredCheck: setIsRequiredCheck,
                                                    setFieldLabel: setFieldLabel,
                                                    setLabelUpdated: setLabelUpdated
                                                    };
                                                    const keyNumber = Number(field.id) + Number(index);
                                                return (
                                                    <div key={Number(keyNumber)} className={classes.indivFieldContainer}>
                                                        <DraggableField key={keyNumber} props={addedFieldProps}/>
                                                    </div>
                                                    )})}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}
                            </Droppable>
                        </div>
                        <div className={classes.submitButton}>
                            <Button
                            type="submit"
                            style={{ fontFamily: "'Roboto Mono', monospace"}}
                            >Create Form</Button>
                        </div>
                    </form>
                </div>
            </DragDropContext>
        </div>
    )
}
