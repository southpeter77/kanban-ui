import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "white",
        opacity: "55%",
        borderRadius: "25pt",
        height: "80vh",
        marginTop: theme.spacing(2),
        width: "95%",
    }
}));

function KanbanBoard() {
    const classes = useStyles();
    return (
        <Container maxWidth="xlg" className={classes.container}>
            <h1>asdf</h1>
        </Container>
    );
}

export default KanbanBoard;