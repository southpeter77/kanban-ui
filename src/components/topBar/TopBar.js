import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    navBar: {
        backgroundColor: "rgb(51,51,51)",
    },
    toolbar: {
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginLeft:"10%",
        marginRight: "10%"
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (

        <AppBar position="static" className={classes.navBar}>
            <div className={classes.toolbar}>
                <Typography variant="h3">
                    Kanban Board
                </Typography>
                <div className={classes.logOut}>

                <Button 
                variant="contained"
                >Log Out</Button>
                </div>
            </div>
        </AppBar>

    );
}