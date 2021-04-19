import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useDispatch} from "react-redux";
import {start_with_given_name} from "../store/actions/user" 

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        backgroundColor: "white",
        opacity: "85%",
        borderRadius: "25pt",
    }
}));

export default function Authentication() {
    const classes = useStyles();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const dispatch = useDispatch();
    
    //handle click
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {firstName, lastName}
        dispatch(start_with_given_name(payload));
    }

    return (
        <>
            <Container component="div" maxWidth="xs" className={classes.container}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    </Avatar>
                    <Typography component="h5" variant="h5">Who is working?</Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="first_name"
                            label="First Name"
                            name="first_name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="last_name"
                            label="Last Name"
                            id="last_name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: "#42454F", color: "white" }}
                            className={classes.submit}
                            onClick={e=>handleSubmit(e)}
                        >
                            Start
          </Button>
                    </form>
                </div>
                <Box mt={8}>
                </Box>
            </Container>
        </>
    );
}