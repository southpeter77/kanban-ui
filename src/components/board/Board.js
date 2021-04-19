import React,{useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from "react-redux"
import ToDo from "./ToDo";
import Complete from "./Complete";
import InProgress from "./InProgress"
import InReview from "./InReview"
import {getAllTasksThunk} from "../store/actions/task"

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "white",
        opacity: "55%",
        borderRadius: "5pt",
        height: "80vh",
        marginTop: theme.spacing(2),
        width: "95%",
        display: "flex",
        alignItems:"center",
        ["@media (max-width:800px)"]: {
            flexWrap : "wrap",
            minHeight: "100vh"
        }
    }
}));

const initialData = {
    tasks: {
        'task-1': {id: 'task-1', content: 'Take out the garbage'},
        'task-2': {id: 'task-2', content: 'Take out the garbage2'},
        'task-3': {id: 'task-3', content: 'Take out the garbage3'},
        'task-4': {id: 'task-4', content: 'Take out the garbage4'},
    }
}

function KanbanBoard() {
    const classes = useStyles();
    const allTasks = useSelector(state=>state.tasks.allTasks)
    const [tasks, setTasks] = useState(initialData)
    const [load, setLoaded] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllTasksThunk());
        setLoaded(true);
    }, [])
    if (!load) {
        return (
            <Container maxWidth="xlg" className={classes.container}>

            </Container>
        )
    }
    return (
        <Container maxWidth="xlg" className={classes.container}>
            <ToDo tasks={allTasks.TO_DO}></ToDo>
            <InProgress tasks={allTasks.IN_PROGRESS} ></InProgress>
            <Complete tasks={allTasks.COMPLETE}></Complete>
            <InReview tasks={allTasks.IN_REVIEW}></InReview>
        </Container>
    );
}

export default KanbanBoard;