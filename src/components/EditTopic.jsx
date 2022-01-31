import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { Tooltip } from '@mui/material';
import { setDoc, doc, collection, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import CreateIcon from '@mui/icons-material/Create';
import { useSelector } from 'react-redux';
import { selectTopicId } from '../features/appSlice';
import { useDocument } from 'react-firebase-hooks/firestore';

function NewTopic({ title, id }) {
  const topicId = useSelector(selectTopicId);
  const [topicDetails] = useDocument(
    id && doc(db, 'topics', id)
  );

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
      const docRef = setDoc(doc(db, "topics", id), {
        name: name,
        description: description,
        time: time,
        timestamp: topicDetails?.data().timestamp
      });
    }

    setOpen(false);
    setName('');
    setDescription('');
    setTime('');
  };

  const handleClickOpen = () => {
    setOpen(true);
    setName(title);
    setDescription(topicDetails?.data().description);
    setTime(topicDetails?.data().time);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setDescription('');
    setTime('');
  };

  return (
    <NewTopicContainer>
      <Tooltip title={`Edit ${topicDetails?.data().name}`}>
        <CreateIcon className='createIcon' onClick={handleClickOpen} />
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit {title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please make your desired changes to the name, description and time estimate of the meeting topic {title}.
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
  > .createIcon {
    padding: 8px;
    color: white;
    font-size: 18px;
    border-radius: 999;
    cursor: pointer;
  }

  > .createIcon:hover {
    opacity: 0.8;
  }
`;
