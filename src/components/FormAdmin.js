import React, {useEffect, useState} from 'react';
import { useAuth0 } from "../react-auth0-spa";
import { makeStyles } from '@material-ui/core/styles';
import { api } from '../config';
import { Card, CardContent, Typography } from '@material-ui/core';

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
        '& .MuiCard-root': {
            backgroundColor: "#62769b",
            color: "#cfcfcf",
            display: "flex",
            flexDirection: "column",
            height: "175px",
            width: "325px",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px",
            margin: "15px",
            transition: "width 0.5s, height 0.5s"
        },
        '& .MuiCard-root:hover': {
            width:"340px",
            height:"190px",
        }
    },
    title: {
        backgroundColor: "#bdbdbd",
        borderRadius: "35px",
        padding: "18px",
        margin: "10px",
        marginTop: "20px",
        opacity: "0.9"
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
                <Typography variant="h3" style={{ fontSize: "40px", color: "#8c94ef"}}>
                    Manage your forms
                </Typography>
            </div>
            <div className={classes.container}>
                { fetched && (
                    forms.map((form)=>{
                        return (
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" style={{ textAlign: "center", padding: "5px" }}>
                                        {form.title}
                                    </Typography>
                                    <Typography variant="h6" style={{ fontSize: "15px", textAlign: "center", padding: "5px"}}>
                                        {form.desc}
                                    </Typography>
                                </CardContent>
                            </Card>
                        )
                    })
                )}
            </div>
        </div>
    )
}
