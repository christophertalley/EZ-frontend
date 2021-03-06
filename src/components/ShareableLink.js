import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) =>
    createStyles({
        typography: {
            padding: theme.spacing(2),
        },
    }),
);

export default function ShareableLink ({formId}) {
    const classes = useStyles();
    const url = process.env.NODE_ENV == "production" ? `https://master.d2orb18e1brind.amplifyapp.com/form/${formId}` : `http://localhost:3000/form/${formId}`
    console.log(url);

    return (
        <PopupState variant="popper" popupId="demo-popup-popper">
            {(popupState) => (
                <div>
                    <IconButton {...bindToggle(popupState)}>
                        <LinkIcon/>
                    </IconButton>
                    <Popper {...bindPopper(popupState)} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper>
                                    <Typography className={classes.typography}>
                                        <Link to={{
                                            pathname: `/form/${formId}`
                                        }}>{url}</Link>
                                    </Typography>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                </div>
            )}
        </PopupState>
    );
}
