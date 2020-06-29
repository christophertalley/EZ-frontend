import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";
import { makeStyles } from '@material-ui/core/styles';
import { api } from '../config';
import { Card, CardContent, Typography,} from '@material-ui/core';
import ShareableLink from './ShareableLink';


const useStyles = makeStyles((theme)=>({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        '& .MuiCard-root': {
            backgroundColor: "#62769b",
            color: "#cfcfcf",
            display: "flex",
            flexDirection: "column",
            height: "225px",
            minWidth: "350px",
            width: "350px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px",
            margin: "20px",
            transition: "width 0.5s, height 0.5s",
            boxSizing: "border-box"
        },
        '& .MuiCard-root:hover': {
            width: "360px",
            height: "230px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        }
    },
    cardContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100%",
        maxHeight: "95%"
    },
    title: {
        backgroundColor: "#bdbdbd",
        borderRadius: "35px",
        padding: "18px",
        margin: "10px",
        marginTop: "20px",
        opacity: "0.9",
    },
    linkContainer: {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "end",
        alignItems: "center",
        padding: "3px",
        margin: "0 auto",
        '& .MuiIconButton-root': {
            padding: "0px",
            margin: "0px"
        },
        '& .MuiIconButton-label': {
            padding: "0px",
            margin: "0px"
        },
    }
}))


export default function FormAdmin(){
    const [fetched, setFetched] = useState(false);
    const [forms, setForms] = useState([])
    const { user, getTokenSilently} = useAuth0();

    const classes = useStyles();

    useEffect(()=>{
        const loadForms = async()=> {
            const userId = user.userId;
            const token = await getTokenSilently();
            const res = await fetch(`${api}/${userId}/forms`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })
            if (res.ok) {
                const result = await res.json();
                console.log(result);
                setForms(result);
                setFetched(true);
            }
    }

    loadForms();
    },[fetched])
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h3" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "40px", color: "#8c94ef",}}>
                    Manage your forms
                </Typography>
            </div>
            <div className={classes.container}>
                { fetched && (
                    forms.map((form)=>{
                        return (
                            <Card id={form._id} style={{display:"flex", flexDirection:"row-reverse", alignItems: "start"}}>
                                <div className={classes.linkContainer}>
                                    <ShareableLink formId={form._id} />
                                </div>
                                <div className={classes.cardContainer}>
                                    <CardContent>
                                        <Typography variant="h5" style={{ fontFamily: "'Roboto Mono', monospace", textAlign: "center", padding: "5px", minWidth: "225px" }}>
                                            {form.title}
                                        </Typography>
                                        <Typography variant="h6" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: "15px", textAlign: "center", padding: "5px", minWidth: "225px"}}>
                                            {form.desc}
                                        </Typography>
                                            <Link to={`/form/${form._id}/analyze`} style={{ fontFamily: "'Roboto Mono', monospace", textDecoration: "none", color: "#64b5f6", fontWeight: "bold", paddingTop:"5px" }}>
                                                <Typography style={{ fontFamily: "'Roboto Mono', monospace", textAlign: "center", }} variant={"h5"}>
                                                    Analyze
                                                </Typography>
                                            </Link>
                                    </CardContent>
                                </div>
                            </Card>
                        )
                    })
                )}
            </div>
        </div>
    )
}
