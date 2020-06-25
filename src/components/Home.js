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
        justifyContent: "center",
        overflowY: "hidden"
    },
    welcomeContainer: {
        padding: "15px",
        marginTop: "30px",
        display:"flex",
        flexDirection: "column",
        backgroundColor: "#5a66bc",
        color: "beige",
        width: "1300px",
        alignItems: "center",
        borderRadius: "50px",
        boxSizing: "borderBox",
        overflowY: "hidden",
        boxShadow: "0px 1px 13px 0px rgba(50, 50, 50, 0.72)",
        '& .MuiButton-root': {
            backgroundColor: "#00396c",
            marginTop: "12px",
            borderRadius: "15px"
        }
}
}));

export default function Home(){
    const {isAuthenticated} = useAuth0();
    const classes = useStyles();
    return (
        <div id="home-container" className={classes.root}>
            <div id="splash-page" className={classes.welcomeContainer}>
                <Typography variant="h4" style={{ fontFamily: "'Roboto Mono', monospace",textAlign: "center", padding: "10px", color:"#f7f7ff"}} >
                    Welcome to EZ Forms. If you need to generate a form  in a quick and hassle-free manner, then you've come to the right place!
                </Typography>
                <img style={{ width: "100%", maxWidth: "1100px", borderRadius: "50px", objectFit: "cover"}}  src={require('../images/splashImage.gif')} alt="loading..." />
                {
                    isAuthenticated &&
                    <Button>
                        <Link style={{ fontFamily: "inherit", color: "#d0edff", textDecoration:"none",}} to="/form-builder">
                            <Typography variant="h5" style={{ fontFamily: "'Roboto Mono', monospace",textAlign: "center", padding: "10px" }}>
                            Create
                        </Typography>
                    </Link>
                </Button>
                }
                {
                    !isAuthenticated &&
                    <Typography variant="h5" style={{ fontFamily: "'Roboto Mono', monospace",textAlign: "center", padding: "10px" }}>
                        To get started, create an account or sign in!
                    </Typography>
                }

            </div>
        </div>
    )
}
