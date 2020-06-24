const fieldData = {
    fields: {
        'field-1': { id: 'field-1', type: 'singleText', label: "Single line text field", options: [] },
        'field-2': { id: 'field-2', type: 'multiText', label: "Multiple line Text field", options: [] },
        'field-3': { id: 'field-3', type: 'number', label: "Number field", options: [] },
        'field-4': { id: 'field-4', type: 'date', label: "Date field", options: [] },
        'field-5': { id: 'field-5', type: 'time', label: "Time field", options: [] },
    },
    formFields: {

    },
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
