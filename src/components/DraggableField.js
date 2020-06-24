import React, {useState, useEffect} from 'react';
import Field from './Field';
import EditableLabel from './EditableLabel';
import { Draggable } from 'react-beautiful-dnd';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export default function DraggableField({ props }) {
    const [isRequired, setIsRequired] = useState(false);
    const { field, index, setIsRequiredCheck, setFieldLabel, setLabelUpdated } = props;
    const fieldId = field.id;
    const id = `${field.id}-dropped`;

    const handleChange = (event) => {

        if (!isRequired) {
            const check = { field:field, isRequired: true}
            setIsRequired(true);
            setIsRequiredCheck(check);
            console.log('here',isRequired);
        } else {
            const check = { field: field, isRequired: false }
            setIsRequiredCheck(check);
            setIsRequired(false)
            console.log('else',isRequired);
        }
        // setIsRequired(!isRequired);
    };
    // useEffect(()=>{

    // },[isRequired])
    console.log(isRequired);

    return (
        <Draggable
            draggableId={id}
            index={index}
        >
            {(provided) => {
                return (
                    <div
                        className="container"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        style={{
                            display: "flex",
                            justifyContent: "start",
                            flexDirection: "column",}}
                    >
                        <EditableLabel field={field} setFieldLabel={setFieldLabel} setLabelUpdated={setLabelUpdated} label={field.label}/>
                        <Field props={props} required={isRequired} />
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            color: "grey"
                        }}>
                            <FormControlLabel
                                control={<Checkbox checked={isRequired} onChange={handleChange} name="required" />}
                                label="Field required?"
                            />
                        </div>

                    </div>

                )
            }}
        </Draggable>
    )
}
