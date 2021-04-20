import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useSelector, useDispatch} from "react-redux"
import {createNewTaskThunk} from "../store/actions/task"


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign:"center",
    borderRadius:"5pt",
    },
}));

export default function CreateTask() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {firstName, lastName} = useSelector(state=>state.user.current_user)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () =>{
    // let today = new Date();
    // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + " at " + today.getHours() + ":" + today.getMinutes()
    const payload = {
      title, description, assignee: `${firstName} ${lastName}`
    }
    dispatch(createNewTaskThunk(payload))
    setTitle("")
    setDescription("")
    setOpen(false);
  }

  return (
    <div>
<IconButton style={{color:"white"}} onClick={handleOpen}><AddCircleOutlineIcon/></IconButton>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>Create New Task</h2>
            <form>
              <TextField
              required
              multiline
              name="task"
              placeholder="Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              />
              <div/>
              <TextField
              required
              multiline={true}
              name="task"
              placeholder="Description"
              style={{marginBottom:'5pt'}}
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              />
              <div/>
              <Button
              size="small"
              variant="outlined"
              onClick={handleSubmit}
              >Add</Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

// assignee: { type: String, required: false},
// title: {type: String, required: true},
// description: {type: String, required: false},
// dateDue: {type: Date, required: true},