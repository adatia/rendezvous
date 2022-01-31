import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { db } from '../firebase';
import { deleteDoc, doc } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { enterRoom } from '../features/appSlice';
import { Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

function DeleteTopic({ title, id }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const deleteMeeting = () => {
    dispatch(enterRoom({
      roomId: null,
    }));
    deleteDoc(doc(db, "rooms", id));

    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DeleteTopicContainer>
      <Tooltip title={`Delete ${title}`}>
        <ClearIcon className='deleteIcon' onClick={handleClickOpen} />
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete ${title}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to delete the meeting topic ${title}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={deleteMeeting} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </DeleteTopicContainer>
  );
}

export default DeleteTopic;

const DeleteTopicContainer = styled.div`
  > .deleteIcon {
    padding: 8px;
    color: white;
    font-size: 18px;
    border-radius: 999;
    cursor: pointer;
  }

  > .deleteIcon:hover {
    opacity: 0.8;
  }
`;
