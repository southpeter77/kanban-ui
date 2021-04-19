import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useSelector, useDispatch} from "react-redux"
import {logOut} from "../store/actions/user"

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
    },
    logOut: {
        fontFamily:theme.typography.fontFamily,
        padding:"5pt"
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const userInfo = useSelector(state=>state.user.current_user)
    const handleLogOut = () =>{
        dispatch(logOut());
    }
    
    return (
        <AppBar position="static" className={classes.navBar}>
            <div className={classes.toolbar}>
                <Typography variant="h3">
                    Kanban Board
                </Typography>
                <Typography variant="h5">Hello, {userInfo.firstName} {userInfo.lastName}</Typography>
                <div className={classes.logOut}>
                <Button
                onClick={()=>handleLogOut()}
                className={classes.logOut}
                variant="contained"
                >Log Out</Button>
                </div>
            </div>
        </AppBar>

    );
}