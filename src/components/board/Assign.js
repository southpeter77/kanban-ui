import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { IconButton } from '@material-ui/core';
import {useDispatch} from "react-redux"
import {assignToUserThunk} from "../store/actions/task"
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import CheckIcon from '@material-ui/icons/Check';

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
    maxHeight:"200pt",
    overflowY:"scroll"
    },
    check:{
        '&:hover': {
            cursor: "pointer",
            color:"green"
        },
    }
}));

export default function Assign({close, title, description, type}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
const [users, setUsers] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAssign =async (user) =>{
    const payload = {
      type,
      title,
      description,
      assignee: `${user.firstName} ${user.lastName}`,
    }
   await dispatch(assignToUserThunk(payload));
   await close(false)
   await setOpen(false);
  }

  useEffect(()=>{
    (async function() {
       let response = await fetch("/v1/users");
       let data = await response.json();
       setUsers(data.users);
    })()
  },[])
  return (
    <div>
<IconButton style={{fontSize:"10pt"}} onClick={()=>setOpen(true)}><EmojiPeopleIcon  className={classes.check}></EmojiPeopleIcon></IconButton>
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
            <h2>Assign this Task</h2>
            {users.map(user=>{
                return (
                    <>
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <h4>@{user.firstName} {user.lastName}</h4>
                    <IconButton
                    onClick={()=>handleAssign(user)}
                    className={classes.check}
                    >
                    <CheckIcon/>
                        </IconButton>
                    </div>
                    </>
                )
            })}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}