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

    }
}))

export default function ({props}) {
    console.log(props);
    const {title, entryResponses} = props;
    console.log()
    const classes = useStyles();
    return (
        <>
        <Typography>
            {title}
        </Typography>
        <TableContainer style={{ maxWidth: '80%', borderRadius: "15px", display: "flex", justifyContent: "center", alignItems: "center" }} component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="right" >
                            <Typography variant="h6" style={{ textAlign: "center", color: "#ff1744", fontFamily: "'Roboto Mono', monospace", fontSize: "15px", padding: "12px" }}>
                                Res #
                        </Typography>
                        </TableCell>
                        <TableCell align="right" >
                            <Typography variant="h6" style={{ textAlign: "center", color: "#ff1744", fontFamily: "'Roboto Mono', monospace", fontSize: "15px", padding: "12px" }}>
                                Question:
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="h6" style={{ textAlign: "center", color: "#ff1744", fontFamily: "'Roboto Mono', monospace", fontSize: "15px", padding: "12px" }}>
                                Response:
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {entryResponses.map((entryResponse, i) => (
                        <TableRow key={`entry-${title}-response-${i}`}>
                            <TableCell component="th" scope="row">
                                {`# ${i}`}
                            </TableCell>
                            <TableCell align="right">{entryResponse[0]}</TableCell>
                            <TableCell align="right">{entryResponse[1]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}
