import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(()=>({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh"
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "500px",
        height: "350px",
        backgroundColor: "#81c784",
        color: "#0288d1",
        borderRadius: "15px"
    }
}))

export default function SubmissionRecieved(){
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.textContainer}>
                <Typography variant="h3" style={{ fontFamily: "'Roboto Mono', monospace", textAlign: "center", fontSize: "30px", padding: "12px" }}>
                    Submission Recieved!
                </Typography>
                <Typography variant="h5" style={{ fontFamily: "'Roboto Mono', monospace", textAlign: "center", fontSize: "20px", padding: "12px" }}>
                    {`Need to generate a form? Create an account at`}
                     <Link style={{
                         textDecoration: "none",
                        color: "#f4511e"

                     }} to={{pathname:"/"}}> EZforms </Link>
                     {`to get started.`}
                </Typography>
            </div>
        </div>
    )
}
