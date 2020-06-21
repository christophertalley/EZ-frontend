import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Field from './Field';
import DraggableField from './DraggableField';
import fieldData from "./FieldData";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditableLabel from './EditableLabel';
// DND Imports
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
const useStyles = makeStyles((theme)=>({
    root: {
        display: "flex",
        flexDirection: "row",
        margin: "10px",
        justifyContent: "center",
        '& label.Mui-focused': {
            color: '#a1887f',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#a1887f',
        },
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
        alignItems: "center",
        minHeight: "200px"
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
    indivFieldContainer: {
        display:"flex",
        justifyContent: "start",
        flexDirection: "column"
    },
    submitButton: {
        '& .MuiButton-root': {
            color: "#90caf9"
        }
    }
}))

export default function EmptyForm(){
    const classes = useStyles();
    const [state, setState ] = useState(fieldData);
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


        const newFinish = {
            ...finish,
            fieldIds: finishFieldIds
        }
        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newFinish.id]: newFinish
            }
        }
        // const formFields = []
        // const newFields = newState.columns["column-2"].fieldIds.map((fieldId) => {
        //     formFields.push(newState.fields[fieldId])
        //     return newState.fields[fieldId]
        // })
        // setFields(newFields)
        setState(newState);

    }

    // useEffect(()=>{
    //     const addFields = ()=> {
    //         const formFields = [...fields]
    //         form
    //         const newFields = state.columns["column-2"].fieldIds.map((fieldId) => {
    //             formFields.push(state.fields[fieldId])
    //             return state.fields[fieldId]
    //         })
    //         setFields(formFields);
    //     }
    //     console.log('current State:',state);

    //     addFields();
    // }, [state.columns["column-2"].fieldIds])
    const createNewForm = async (e)=> {

    }




    return (
        <div className={classes.root}>
            <DragDropContext onDragEnd={handleDrop}>
                <div className={classes.fieldContainer}>
                    <Typography variant="h3" style={{ textAlign: "center", fontSize: "25px", padding:"12px"}} >
                        Default Fields
                    </Typography>
                    <Typography style={{ textAlign: "center" }} >
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
                                    return <DraggableField key={defaultField.id} props={defaultFieldProps}/>
                                    })}
                                {provided.placeholder}
                            </div>
                        )
                    }}
                    </Droppable>

                </div>
                <div className={classes.formContainer}>
                    <form onSubmit={createNewForm} id="empty">
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
                            <Droppable droppableId={state.columns["column-2"].id}>
                                {(provided)=>{
                                    return (
                                        <div
                                        className={classes.fieldBox}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        >
                                            {fields.map((field, index)=>{
                                                const addedFieldProps = { field: field, disabled: false, index: index};
                                                return (
                                                    <div className={classes.indivFieldContainer}>
                                                        <EditableLabel id={field.id} label={field.label} />
                                                        <Field props={addedFieldProps}/>
                                                    </div>
                                                    )})}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}
                            </Droppable>
                        </div>
                        <Button
                        className={classes.submitButton}
                        type="submit"
                        >Create Form</Button>
                    </form>
                </div>
            </DragDropContext>
        </div>
    )
}
