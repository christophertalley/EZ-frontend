const fieldData = {
    fields: [
        { id: 'field-1', type: 'singleText', label: "Single line text field", columnId: 1, options: [] },
        { id: 'field-2', type: 'multiText', label: "Multiple line Text field", columnId: 1, options: [] },
        { id: 'field-3', type: 'number', label: "Number field", columnId: 1, options: [] },
        { id: 'field-4', type: 'date', label: "Date field", columnId: 1, options: [] },
        { id: 'field-5', type: 'time', label: "Time field", columnId:1, options: [] },
    ]
}
// ColumnId is for DRAG AND DROP to signal which form the field is being rendered in.
export default fieldData;
