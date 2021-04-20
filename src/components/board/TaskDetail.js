import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {useSelector, useDispatch} from "react-redux"
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';


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


export default function TaskDetail({title, dateDue, assignee, description, type}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
<Button variant="outlined" size="small" style={{height:"20pt", marginTop:"10%", borderRadius:"10pt"}} onClick={handleOpen}>View</Button>
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
            <h2>Title: {title}</h2>
            <h5>Due Date:{dateDue}</h5>
            <h4>Assignee:{assignee}<IconButton style={{fontSize:"10pt"}}><EmojiPeopleIcon></EmojiPeopleIcon></IconButton></h4>
            <h4>Description: {description}</h4>
          </div>
          
        </Fade>
      </Modal>
    </div>
  );
}