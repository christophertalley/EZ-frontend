import React from "react";
import {Link} from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
            width: "200px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        nav: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100vw"
        }
    }),
);

export default function Navbar () {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="sticky" style={{ backgroundColor:"#90a4ae", color:"grey"}}>
                <Toolbar>
                    <div className={classes.nav}>
                        <div className={classes.titleContainer}>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <Link to="/" style={{textDecoration:"none", color:"white"}}>
                                <Typography>
                                    EZforms
                                </Typography>
                            </Link>
                        </div>
                        <div className={classes.linkContainer}>
                            {!isAuthenticated && (
                                <button onClick={() => loginWithRedirect({})}>Log in</button>
                            )}

                            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

                            {isAuthenticated && (
                                <>
                                    <Link to="/profile">Profile</Link>
                                    <Link to="/external-api">External Api</Link>
                                </>
                            )}
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};
