import React from "react";
import {Link} from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        titleContainer:{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
        },
        linkContainer: {
            minWidth: "100px",
            maxWidth: "150px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 1
        },
        nav: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100vw",
            padding: "10px"
        },
    }),
);

export default function Navbar () {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="sticky" style={{
                backgroundColor: "#34515e",
                color:"#bdbdbd",
                borderRadius:"20px",
                boxShadow: "0px 0px 10px rgba(0,0,0,.8)"
                }}>
                <Toolbar>
                    <div className={classes.nav}>
                        <div className={classes.titleContainer}>
                            <Link to="/" style={{ fontFamily: "'Roboto Mono', monospace", textDecoration: "none", color:"#64b5f6", fontWeight:"bold"}}>
                                <Typography style={{ fontFamily: "'Roboto Mono', monospace"}} variant={"h5"}>
                                    EZforms
                                </Typography>
                            </Link>
                        </div>


                        <div className={classes.linkContainer}>

                            {!isAuthenticated && (
                                <IconButton style={{alignSelf: "end"}} onClick={() => loginWithRedirect({})}>
                                    <EmojiPeopleIcon style={{ color: "#64b5f6"}}/>
                                    <Typography style={{ color: "#64b5f6" }}>
                                        Login
                                    </Typography>
                                </IconButton>
                            )}
                            {isAuthenticated && (
                                <>
                                    <Link to="/admin" style={{ textDecoration: "none", color: "#64b5f6", fontWeight: "bold", marginRight: "8px" }}>My Forms</Link>
                                    <IconButton onClick={() => logout()}>
                                        <ExitToAppIcon style={{ color: "#64b5f6", marginLeft: "8px" }} />
                                    </IconButton>
                                </>
                            )}

                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};
