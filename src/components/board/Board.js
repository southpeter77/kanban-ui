import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux"
import ToDo from "./ToDo";
import Complete from "./Complete";
import InProgress from "./InProgress"
import InReview from "./InReview"
import { getAllTasksThunk,updateOrderThunk } from "../store/actions/task"
import { DragDropContext } from "react-beautiful-dnd";
import { ContactlessOutlined, IsoOutlined } from '@material-ui/icons';



const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "white",
        opacity: "55%",
        borderRadius: "5pt",
        height: "80vh",
        marginTop: theme.spacing(2),
        width: "95%",
        display: "flex",
        alignItems: "center",
        ["@media (max-width:800px)"]: {
            flexWrap: "wrap",
            minHeight: "100vh"
        }
    }
}));



function KanbanBoard() {
    const classes = useStyles();
    const allTasks = useSelector(state => state.tasks.allTasks)
    // const [tasks, setTasks] = useState('')
    const [load, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async function () {
            await dispatch(getAllTasksThunk())
            await setLoaded(true)
        }())
    }, [])  

    const onDragEnd = (result) =>{

        const {destination, source} = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        if (destination.droppableId === source.droppableId){
            let state = {...allTasks}
            let copy = [...allTasks[source.droppableId.split("-")[1]]]
            let removed = copy[source.index];
            copy[source.index] = copy[destination.index];
            copy[destination.index] = removed
            state[source.droppableId.split("-")[1]] = copy;
            console.log(result)
            dispatch(updateOrderThunk({column:destination.droppableId.split("-")[1] ,newData:state}));
            return;
        }

        // const startingIndex = source.index
        // const endingIndex = destination.index
        // const startingColumnCopy = Array.from(allTasks[source.droppableId.split("-")[1]]);
        // const endingColumnCopy = Array.from(allTasks[destination.droppableId.split("-")[1]]);
        // let removed = startingColumnCopy.splice(startingIndex, 1);
        // endingColumnCopy.splice(endingIndex, 0, removed)
        // dispatch(updateOrderThunk({startingColumnCopy, endingColumnCopy}));
    }

    if (!load) {
        return (
            <Container maxWidth="xl" className={classes.container}>
            </Container>
        )
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container maxWidth="xl" className={classes.container}>
                <ToDo tasks={allTasks.TO_DO}></ToDo>
                <InProgress tasks={allTasks.IN_PROGRESS} ></InProgress>
                <Complete tasks={allTasks.COMPLETE}></Complete>
                <InReview tasks={allTasks.IN_REVIEW}></InReview>
            </Container>
        </DragDropContext>


    );
}

export default KanbanBoard;