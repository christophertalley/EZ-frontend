import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Field from './Field';
import DraggableField from './DraggableField';
import fieldData from "./FieldData";
import formData from "./FormData"
import TextField from '@material-ui/core/TextField';
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
        // if (destination.droppableId === 'column-2') {
        //     const newColumn = state.columns[destination.droppableId];
        //     const newField = state.fields[draggableId];
        //     const newColumnFieldIds = Array.from(newColumn.fieldIds);
        //     newColumnFieldIds.push(newField.id);
        //     setFields(...fields, newField);
        // }
        console.log('source:', source);
        console.log('destination:', destination);


        const start = state.columns[source.droppableId];
        const finish = state.columns[destination.droppableId];
        if (start === finish) {
            return
        }
        const startFieldIds = Array.from(start.fieldIds);
        startFieldIds.splice(source.index);
        const finishFieldIds = Array.from(finish.fieldIds);
        finishFieldIds.splice(destination.index, 0, draggableId);
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
        setState(newState);

        // const newFieldIds = Array.from(start.fieldIds);
        // newFieldIds.splice(source.index, 1);
        // newFieldIds.splice(destination.id, 0, draggableId);

        // const newColumn = {
        //     ...start,
        //     fieldIds: newFieldIds
        // }
        // const newState = {
        //     ...state,
        //     columns: {
        //         ...state.columns,
        //         [newColumn.id]: newColumn
        //     }
        // }
        // const updatedFieldsArray = [];
        // const updatedFields = newState.columns["column-1"].fieldIds.map((fieldId) => {
        //     updatedFieldsArray.push(newState.fields[fieldId])
        //     return newState.fields[fieldId]
        // });
        // setDefaultFields(updatedFieldsArray)
        // setState(newState);

    }
    // useEffect(() => {
    //     const loadFields = async () => {
    //         const emptyFields = [];
    //         const dndFields = state.columns["column-1"].fieldIds.map((fieldId) => {
    //             emptyFields.push(state.fields[fieldId])
    //             return state.fields[fieldId]
    //         });
    //         setDefaultFields(emptyFields);

    //     }
    //     loadFields();
    // }, [state])
    useEffect(()=>{
        const addFields = ()=> {
            const formFields = []
            const newFields = state.columns["column-2"].fieldIds.map((fieldId) => {
                formFields.push(state.fields[fieldId])
                return state.fields[fieldId]
            })
            setFields(formFields);
        }
        console.log('current State:',state);

        addFields();
    }, [state.columns["column-2"].fieldIds])



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
                            <Droppable droppableId={state.columns["column-2"].id}>
                                {(provided)=>{
                                    return (
                                        <div
                                        className={classes.fieldBox}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        >
                                            {fields.map((field, index)=>{
                                                const addedFieldProps = { field: field, disabled: false, index: index, label: field.label };
                                                return <Field props={addedFieldProps}/>})}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}
                            </Droppable>
                        </div>
                    </form>
                </div>

            </DragDropContext>
        </div>
    )
}
