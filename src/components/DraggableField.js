import React from 'react';
import Field from './Field';
import EditableLabel from './EditableLabel';
import { Draggable } from 'react-beautiful-dnd';

export default function DraggableField({ props }) {
    const { field, index } = props;
    return (
        <Draggable
            draggableId={field.id}
            index={index}
        >
            {(provided) => {
                return (
                    <div
                        className="container"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <EditableLabel label={field.label}/>
                        <Field props={props} />
                    </div>

                )
            }}
        </Draggable>
    )
}
