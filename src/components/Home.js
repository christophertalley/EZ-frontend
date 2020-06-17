import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=>({
    root: {
        color: "black"
    }
}));

export default function Home(){
    const classes = useStyles();
    return (
        <div id="home-container" className={classes.root}>
            <div id="welcome-message">
                Welcome to EZ Forms. If you need to create a form to distribute in a quick and hassle-free manner, then youve come to the right place.
            </div>
            <Link to="/form-builder">
                Create
            </Link>

        </div>
    )
}
