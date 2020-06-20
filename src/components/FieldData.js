const fieldData = {
    fields: [
        { id: 'field-1', type: 'singleText', label: "Single line text field", options: [] },
        { id: 'field-2', type: 'multiText', label: "Multiple line Text field", options: [] },
        { id: 'field-3', type: 'number', label: "Number field", options: [] },
        { id: 'field-4', type: 'date', label: "Date field", options: [] },
        { id: 'field-5', type: 'time', label: "Time field", options: [] },
    ],
    columns: {
        'column-1': {
            id: 'column-1',
            fieldIds: ['field-1', 'field-2', 'field-3', 'field-4', 'field-5']
        },
        'column-2': {
            id: 'column-2',
            fieldIds: []
        }
    },
    columnOrder: ['column-1', 'column-2']
}
// ColumnId is for DRAG AND DROP to signal which form the field is being rendered in.
export default fieldData;
