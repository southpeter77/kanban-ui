import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme=>({
    card : {
        display:"flex",
        width:"90%",
        height: 100,
        marginBottom: theme.spacing(1),
        margin: "auto auto",
        
    },
    detail:{
        display:"flex",
        flexGrow:1,
        flexDirection:"column"
    },
    content: {
        flex:"1 0 auto"
    }
}))

const Task = ({task}) => {
    const classes=useStyles();

    return (
        <Card className={classes.card}>
        <div className={classes.detail}>
            <CardContent className={classes.content}>
                <Typography component="h6" variant="h6">Title: {task.title}</Typography>
                <Typography component="h6" variant="h6">Assignee: {task.assignee}</Typography>
                <Typography component="subheader" variant="subheader">Description: {task.description}</Typography>

            </CardContent>
            <div>
                <Typography></Typography>
            </div>
        </div>
    </Card>
    );
}

export default Task;
