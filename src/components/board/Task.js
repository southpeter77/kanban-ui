import React,{useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TaskDetail from "./TaskDetail"
import { Draggable } from "react-beautiful-dnd";


const useStyles = makeStyles(theme => ({
    card: {
        display: "flex",
        width: "90%",
        height: 100,
        marginBottom: theme.spacing(1),
        margin: "auto auto",
        '&:hover': {
            cursor: "pointer"
        },
    },
    detail: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column"
    },
    content: {

        marginTop: "-5pt"
    }
}))

const Task = ({ task, index }) => {
    const classes = useStyles();
    useEffect(()=>{},[task])
    return (
        <Draggable draggableId={task._id} index={index}>
            {provided=>(
            <Card
            key={index}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={classes.card}>
            <div className={classes.detail}>
                <CardContent className={classes.content}>
                    <Typography component="div" style={{ fontSize: "10pt" }}>Title: {task.title}</Typography>
                    <Typography component="div" style={{ fontSize: "10pt" }}>Due: {task.dateDue.split('.')[0].split("T").join(",  ")}</Typography>
                    <Typography component="div" style={{ fontSize: "10pt" }}>Assignee: {task.assignee}</Typography>
                    <Typography component="div" style={{ fontSize: "10pt" }}>Description: {task.description}</Typography>
                </CardContent>
                <div>
                    <Typography></Typography>
                </div>
            </div>
            <TaskDetail
                title={task.title}
                dateDue={task.dateDue.split('.')[0].split("T").join(",  ")}
                assignee={task.assignee}
                description={task.description}
            >View</TaskDetail>
        </Card>
            )}

        

        </Draggable>
    );
}

export default Task;
