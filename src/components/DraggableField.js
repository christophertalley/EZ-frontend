import React, {useState} from 'react';
import Field from './Field';
import EditableLabel from './EditableLabel';
import { Draggable } from 'react-beautiful-dnd';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export default function DraggableField({ props }) {
    const [isRequired, setIsRequired] = useState(false);
    const { field, index, setIsRequiredCheck } = props;
    const fieldId = field.id;
    const id = `${field.id}-dropped`;

    const handleChange = async (event) => {
        setIsRequired(!isRequired);
        if (isRequired) {
            const check = {id: fieldId, isRequired: isRequired}
            await setIsRequiredCheck('check');
        } else {
            setIsRequiredCheck({})
        }
    };

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
                            flexDirection: "column"}}
                    >
                        <EditableLabel label={field.label}/>
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
