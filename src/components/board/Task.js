import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TaskDetail from "./TaskDetail"
import { Draggable } from "react-beautiful-dnd";
import DeleteIcon from '@material-ui/icons/Delete';
import {deletetaskThunk, removeFromSourceListThunk} from "../store/actions/task"
import {useDispatch} from "react-redux"


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
    },
    delete:{
        '&:hover': {
            cursor: "pointer",
            color:"red"
        },
    }
}))

const Task = ({ task, index }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const handleDelete = async () => {
        let removePayload = {source:task.type.split(" ").join("_"), sourceIndex:index}
        await dispatch(removeFromSourceListThunk(removePayload))
        await dispatch(deletetaskThunk({title:task.title}))
    }

    useEffect(() => { }, [task])
    return (
        <Draggable draggableId={task._id} index={index}>
            {provided => (
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
                        type={task.type}
                    >View</TaskDetail>
                        <DeleteIcon 
                        className={classes.delete}
                        onClick={handleDelete}
                        ></DeleteIcon>
                </Card>
            )}



        </Draggable>
    );
}

export default Task;
