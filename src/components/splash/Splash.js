import React from 'react';
import Authentication from "../authentication/Authentication"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    headLine1: {
        fontSize: "100px",
        color: "rgb(214, 214, 214)",
        textAlign: "center"
    },
    subHeadLine1: {
        fontSize: "40px",
        color: "rgb(214, 214, 214)",
        textAlign: "center",
        maxWidth: "60%",
        margin: "auto auto"
    },
    subHeadLine2: {
        fontSize: "30px",
        color: "rgb(214, 214, 214)",
        textAlign: "center",
        maxWidth: "60%",
        margin: "auto auto"
    }

}));

function Splash() {
    const classes = useStyles();

    return (
        <>
        <div className="splash__intro">
        <Typography component="h1" className={classes.headLine1}> welcome to kanban board</Typography>
        <Typography component="h2" className={classes.subHeadLine1}>Let's make your work visible so you can show it to others and keep everyone on the same page</Typography>
        </div>
            
            <Authentication/>

        </>
    );
}

export default Splash;