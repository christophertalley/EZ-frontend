import React, { useEffect, useState } from 'react';
import { useParams,} from 'react-router-dom';
import { api } from '../config';
import { useAuth0 } from '../react-auth0-spa';
import { Paper, Typography, makeStyles } from '@material-ui/core';
import FormEntry from './FormEntry';
import "../styles/analytics-page.css"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(()=>({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "3vh"
    },
    paper: {
        backgroundColor: "#90caf9",
        width: "70vw",
        borderRadius: "20px",
        maxHeight: "85vh",
        overflowY: "auto",
        padding: "5px"
    },
    entry: {
        padding: "5px",
        border: "2px solid #c5cae9",
        borderRadius: "20px",
        margin: "15px",
        backgroundColor: "#bbdefb"
    },
    table: {
        maxWidth: "80%",
        marginLeft: "0 auto",
        marginRight: "0 auto"
    }
}))


export default function FormAnalytics(){
    const classes = useStyles();
    const { formId } = useParams();
    const {getTokenSilently, loading} = useAuth0();
    const [fetched, setFetched] = useState(false);
    const [responses, setResponses] = useState([]);
    const [entryResponses, setEntryResponses] = useState({});
    const [entryTables, setEntryTables] = useState([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    useEffect(()=>{
        const loadResponses = async () => {
            const token = await getTokenSilently();
            const res = await fetch(`${api}/forms/${formId}/data`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.ok) {
                const apiResponses = await res.json();
                if (apiResponses.length !== 0) {
                    setTitle(apiResponses[0].title);
                    setDesc(apiResponses[0].desc);
                    setResponses(apiResponses);
                    setFetched(true);
                }
            }
        }

        loadResponses();
    }, []);

    useEffect(()=> {
        const entryObj = {};
        for (let i = 0; i < responses.length; i++) {
            const values = Object.values(responses[i].responses);
            const entryId = `entry-${i}`;
            const entries = [];
            values.forEach((value) => {
                entries.push(value)
            });
            entryObj[entryId] = entries;
        }
        setEntryResponses(entryObj);

    }, [responses]);

    const entryBuilder = () => {
        const questions= [];
        const answers = [];
        let responseNum = responses.length;
        console.log(responseNum);
        let formBuilderArray=[]
            responses.map((response, index)=>{

                const currentEntries = entryResponses[`entry-${index}`];
                let currentEntryId = `entry-${index}`;
                let currentEntryObj = {'title': currentEntryId, 'entryResponses':[]}
                // entryNos = currentEntries.length;
                if (currentEntries) {
                    currentEntries.map((currentEntry)=>{
                        console.log(currentEntry)

                        // return <div>{currentEntry.questiob}</div>
                        questions.push(currentEntry.question);
                        answers.push(currentEntry.response);
                        currentEntryObj['entryResponses'] = [[currentEntry.question, currentEntry.response], ...currentEntryObj['entryResponses']]
                    })
                    formBuilderArray.push(currentEntryObj);
                }})
                console.log(formBuilderArray);
        return formBuilderArray;

    }
    // useEffect(()=>{
    //     const newFormTables = entryBuilder();
    //     console.log(newFormTables);
    //     setEntryTables(newFormTables);
    // }, [])
        // <div className={classes.entry}>
        //     <Typography variant="h3" style={{ color: "#455a64", fontFamily: "'Roboto Mono', monospace", fontSize: "18px", padding: "12px", fontStyle: "italic" }}>
        //         {`Entry no.${index + 1}:`}
        //     </Typography>
        //     <Typography variant="h6" style={{ textAlign: "center", color: "#ff1744", fontFamily: "'Roboto Mono', monospace", fontSize: "15px", padding: "12px" }}>
        //         {
        //             currentEntry.question
        //         }
        //     </Typography>
        //     <Typography variant="h6" style={{ textAlign: "center", color: "#ff1744", fontFamily: "'Roboto Mono', monospace", fontSize: "15px", padding: "12px" }}>
        //         {
        //             currentEntry.response
        //         }
        //     </Typography>
        // </div>
    // questionAndAnswers.push(currentEntry.question);
    // questionAndAnswers.push(currentEntry.response);
    const newFormTables = entryBuilder();
    console.log(newFormTables);
    if (loading || entryResponses.length === 0) {
        return (
            <div>
                Loading...
            </div>
        )
    } else if (!responses) {
        return (
            <div>
                No entries submitted
            </div>
        )
    } else {
        if (responses.length === 0) {

            return (
                <div className={classes.container}>
                    <Paper className={classes.paper} elevation={3}>
                        <Typography variant="h3" style={{ fontFamily: "'Roboto Mono', monospace", textAlign: "center", fontSize: "30px", padding: "12px" }}>
                            No entries recieved!
                        </Typography>
                    </Paper>
                </div>
            )
        }
        if (newFormTables.length > 0) {

            return (
                <div className={classes.container}>
                    <Paper id="entry-container" className={classes.paper}>
                        <Typography variant="h3" style={{ color: "#536dfe", fontFamily: "'Roboto Mono', monospace", textAlign: "center", fontSize: "30px", padding: "12px" }}>
                            {title}
                        </Typography>
                        <Typography variant="h3" style={{ color: "#536dfe",fontFamily: "'Roboto Mono', monospace", textAlign: "center", fontSize: "20px", padding: "12px" }}>
                            {desc}
                        </Typography>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center" }} >
                        </div>
                        {
                            newFormTables.map((table)=>{
                                return <FormEntry props={table}/>
                            })
                        }
                        {/* {responses.map((response, index)=>{
                            if (entryResponses !== {} && responses !== {}) {
                             entryBuilder();
                             }

                            const currentEntries = entryResponses[`entry-${index}`];
                            if (currentEntries !== undefined) {
                                return (
                                    <div className={classes.entry}>
                                        <Typography variant="h3" style={{ color: "#455a64", fontFamily: "'Roboto Mono', monospace", fontSize: "18px", padding: "12px", fontStyle:"italic" }}>
                                            {`Entry no.${index + 1}:`}
                                        </Typography>
                                        <Typography variant="h6" style={{ textAlign: "center", color: "#ff1744", fontFamily: "'Roboto Mono', monospace", fontSize: "15px", padding: "12px" }}>
                                            {
                                                JSON.stringify(currentEntries)
                                            }
                                        </Typography>
                                    </div>
                                )
                            }
                        })} */}
                    </Paper>
                </div>
            )
    } else {
        return <div>loading..</div>
    }
    }
}
