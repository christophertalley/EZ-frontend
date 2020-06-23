import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useAuth0 } from "../react-auth0-spa";

const useStyles = makeStyles((theme)=>({
    root: {
        color: "black",
        display: "flex",
        justifyContent: "center"
    },
    welcomeContainer: {
        padding: "18px",
        marginTop: "30px",
        display:"flex",
        flexDirection: "column",
        backgroundColor: "#0277bd",
        color: "beige",
        width: "1300px",
        alignItems: "center",
        borderRadius: "50px",
        boxSizing: "borderBox"
    }
}));

export default function Home(){
    const {isAuthenticated} = useAuth0();
    const classes = useStyles();
    return (
        <div id="home-container" className={classes.root}>
            <div id="splash-page" className={classes.welcomeContainer}>
                <Typography variant="h4" style={{ textAlign: "center", padding: "10px" }} >
                    Welcome to EZ Forms. If you need to generate a form  in a quick and hassle-free manner, then you've come to the right place!
                </Typography>
                <img style={{ width:"1200px",borderRadius: "50px"}}  src={require('../images/splashImage.gif')} alt="loading..." />
                {
                    isAuthenticated &&
                    <Button style={{ backgroundColor: "#808e95",marginTop: "12px", borderRadius: "15px"}}>
                    <Link style={{fontFamily:"inherit", color: "beige",}} to="/form-builder">
                        <Typography variant="h5" style={{ textAlign: "center", padding: "10px" }}>
                            Create
                        </Typography>
                    </Link>
                </Button>
                }
                {
                    !isAuthenticated &&
                    <Typography variant="h5" style={{ textAlign: "center", padding: "10px" }}>
                        To get started, create an account or sign in!
                    </Typography>
                }

            </div>
        </div>
    )
}
