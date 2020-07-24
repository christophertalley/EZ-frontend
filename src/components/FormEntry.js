import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(()=>({
    table: {
        maxWidth:"80%"
    }
}))

export default function ({props}) {
    console.log(props);
    const {title, entryResponses} = props;
    console.log()
    const classes = useStyles();
    return (
        <>
        <Typography variant="h5" style={{ backgroundColor: "white", marginBottom: "1.5vh", borderRadius: "10px", width:"fit-content",marginLeft: "25px", color: "#91A6B4", fontFamily: "'Roboto Mono', monospace", textAlign:"start", fontSize: "24px", padding: "12px" }}>
            {title}:
        </Typography>
        <TableContainer style={{ margin: "0 auto", padding: "2px", marginBottom:"1.5vh", maxWidth: '80%', borderRadius: "15px", display: "flex", justifyContent: "center", alignItems: "center" }} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" >
                            Res #:
                        </TableCell>
                        <TableCell align="center" >
                            Questions:
                        </TableCell>
                        <TableCell align="center">
                            Response:
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {entryResponses.map((entryResponse, i) => (
                        <TableRow key={`entry-${title}-response-${i}`}>
                            <TableCell component="th" scope="row">
                                {`# ${i}`}
                            </TableCell>
                            <TableCell align="left">{entryResponse[0]}</TableCell>
                            <TableCell align="left">{entryResponse[1]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}
