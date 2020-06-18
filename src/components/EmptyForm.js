import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles(()=>({
    root: {
        display: "flex",
        flexDirection: "row",
        margin: "10px",
        justifyContent: "center",
    },
    fieldContainer: {
        backgroundColor: "#90caf9",
        display: "flex",
        flexDirection: "column",
        height: "700px",
        width: "450px",
        borderRadius: "15px",
        margin: "15px",
        marginRight: "50px"

    },
    formContainer: {
        backgroundColor: "#ffe0b2",
        display: "flex",
        flexDirection: "column",
        height: "700px",
        width: "450px",
        borderRadius: "15px",
        margin: "15px",
        marginLeft: "50px"
    }
}))

export default function EmptyForm(){
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.fieldContainer}>
                <Typography>
                    Fields will go here
                </Typography>
            </div>
            <div className={classes.formContainer}>
                form will go here
            </div>
        </div>
    )
}
