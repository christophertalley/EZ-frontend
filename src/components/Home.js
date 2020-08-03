import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useAuth0 } from "../react-auth0-spa";

const useStyles = makeStyles((theme) => ({
    root: {
        color: "black",
        display: "flex",
        justifyContent: "center",
        overflowY: "hidden"
    },
    welcomeContainer: {
        padding: "15px",
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#5a66bc",
        color: "beige",
        maxWidth: "65vw",
        maxHeight: "80vh",
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

export default function Home() {
    const { user, isAuthenticated } = useAuth0();
    const classes = useStyles();
    return (
        <div id="home-container" className={classes.root}>
            <div id="splash-page" className={classes.welcomeContainer}>
                {
                    isAuthenticated &&
                    <Typography variant="h4" style={{ fontFamily: "'Roboto Mono', monospace", textAlign: "center", padding: "10px", color: "#f7f7ff", fontSize: "2rem" }} >
                        Welcome back {user.nickname}!
                    </Typography>
                }
                {
                    !isAuthenticated &&
                    <Typography variant="h4" style={{ fontFamily: "'Roboto Mono', monospace", textAlign: "center", padding: "10px", color: "#f7f7ff", fontSize: "2rem" }} >
                        Welcome to EZforms!
                    </Typography>
                }
                <Typography variant="h4" style={{ fontFamily: "'Roboto Mono', monospace", textAlign: "center", padding: "10px", color: "#f7f7ff", fontSize: "1.15rem" }} >
                    EZforms is the simplest way to host, share, and analyze forms to collect feedback from peers.
                </Typography>
                {
                    !isAuthenticated &&
                    <Typography variant="h4" style={{ fontFamily: "'Roboto Mono', monospace", textAlign: "center", padding: "10px", color: "#f7f7ff", fontSize: "1.5rem" }} >
                        What are you waiting for? Get started now!
                    </Typography>
                }
                {
                    isAuthenticated &&
                    <Typography variant="h4" style={{ fontFamily: "'Roboto Mono', monospace", textAlign: "center", padding: "10px", color: "#f7f7ff", fontSize: "1.5rem" }} >
                        Click create to make a new form or click on my forms to share/analyze.
                    </Typography>
                }
                <img style={{ width: "85%", maxWidth: "1100px", borderRadius: "50px", objectFit: "cover" }} src={require('../images/splashImage.gif')} alt="loading..." />
                {
                    isAuthenticated &&
                    <Button>
                        <Link style={{ fontFamily: "inherit", color: "#d0edff", textDecoration: "none", }} to="/form-builder">
                            <Typography variant="h5" style={{ fontFamily: "'Roboto Mono', monospace", textAlign: "center", padding: "10px" }}>
                                Create
                            </Typography>
                        </Link>
                    </Button>
                }
                {
                    !isAuthenticated &&
                    <Typography variant="h5" style={{ fontFamily: "'Roboto Mono', monospace", textAlign: "center", padding: "10px" }}>
                        To get started, create an account or sign in!
                    </Typography>
                }

            </div>
        </div>
    )
}
