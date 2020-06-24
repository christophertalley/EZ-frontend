import React from 'react';
import Field from './Field';
import { Draggable } from 'react-beautiful-dnd';

export default function DraggableEmptyField({props}){
    const { field, index } = props;
    return (
        <Draggable
        draggableId={field.id}
        index={index}
        >
        {(provided)=>{
            return (
                <div
                className="container"
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                >
                    <Field props={props}/>
                </div>

            )
        }}
        </Draggable>
    )
}
