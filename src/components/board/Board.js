import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux"
import ToDo from "./ToDo";
import Complete from "./Complete";
import InProgress from "./InProgress"
import InReview from "./InReview"
import { getAllTasksThunk,updateOrderThunk,updateTaskStatusThunk,removeFromSourceListThunk,addFromDestinationListThunk} from "../store/actions/task"
import { DragDropContext } from "react-beautiful-dnd";
import { ContactlessOutlined, IsoOutlined } from '@material-ui/icons';

import Column from "./Column"


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
        if (!destination) return;// no destination
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        //cancel if same location.

        //if same column
        if (destination.droppableId === source.droppableId){
            let state = {...allTasks}
            let copy = [...allTasks[source.droppableId]]
            let removed = copy[source.index];
            copy[source.index] = copy[destination.index];
            copy[destination.index] = removed
            state[source.droppableId] = copy;
            dispatch(updateOrderThunk(state));
            return;
        }else {
            //different column
            //must update the state and change the type value to back end.
            let state = {...allTasks}
            let sourceCopy = [...allTasks[source.droppableId]];
            let destinationCopy = [...allTasks[destination.droppableId]];
            let removed = sourceCopy.splice(source.index, 1)
            destinationCopy.splice(destination.index, 1, removed)
            state[source.droppableId] = sourceCopy;
            state[destination.droppableId] = destinationCopy;
            let newType = "COMPLETE"
            if (destination.droppableId === "IN_PROGRESS") newType = "IN PROGRESS"
            if (destination.droppableId === "TO_DO") newType = "TO DO"
            if (destination.droppableId === "IN_REVIEW") newType = "IN REVIEW"

            let payload = {
                type:newType,
                assignee:removed[0].assignee,
                title:removed[0].title,
                description:removed[0].description,
            }
            let removePayload = {
                source:source.droppableId,
                sourceIndex:source.index
            }
            let addPayload = {
                destination:destination.droppableId,
                destinationIndex:source.index,
                removed:removed[0]
            }
            dispatch(addFromDestinationListThunk(addPayload));
            dispatch(removeFromSourceListThunk(removePayload));
            dispatch(updateTaskStatusThunk(payload));
        }
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
                {Object.keys(allTasks).map((column, index) =>{
                    return (
                        <Column
                        key={index}
                        tasks={allTasks[column]}
                        index={index}
                        column={column}
                        >
                        </Column>
                    )
                })}

                {/* <ToDo tasks={allTasks.TO_DO}></ToDo>
                <InProgress tasks={allTasks.IN_PROGRESS} ></InProgress>
                <Complete tasks={allTasks.COMPLETE}></Complete>
                <InReview tasks={allTasks.IN_REVIEW}></InReview> */}
            </Container>
        </DragDropContext>


    );
}

export default KanbanBoard;