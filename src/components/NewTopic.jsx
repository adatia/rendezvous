import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';
import { Tooltip } from '@mui/material';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

function NewTopic() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = () => {
    if (name && description && time) {
      const docRef = addDoc(collection(db, "rooms"), {
        name: name,
        description: description,
        time: time,
        timestamp: serverTimestamp()
      });
    }

    setOpen(false);
    setName('');
    setDescription('');
    setTime('');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setDescription('');
    setTime('');
  };

  return (
    <NewTopicContainer>
      <Tooltip title="Create a new meeting topic">
        <IconButton className='createIcon' onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Meeting Topic</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name, description and time estimate of the meeting topic.
          </DialogContentText>
          <TextField
            autoFocus
            required
            multiline
            margin="dense"
            label="Topic Name"
            variant="standard"
            value={name}
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            required
            multiline
            fullWidth
            margin="dense"
            label="Topic Description"
            variant="standard"
            value={description}
            onChange={handleDescriptionChange}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            required
            multiline
            margin="dense"
            label="Topic Time Estimate"
            variant="standard"
            value={time}
            onChange={handleTimeChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </NewTopicContainer>
  );
}

export default NewTopic;

const NewTopicContainer = styled.div`
  > .createIcon > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }

  > .createIcon:hover > .MuiSvgIcon-root {
    opacity: 0.8;
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;
