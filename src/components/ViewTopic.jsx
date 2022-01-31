import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';
import { Tooltip } from '@mui/material';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { query, doc, orderBy } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ViewTopic() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && doc(db, 'rooms', roomId)
  );

  return (
    <div>
      <NewTopicButton onClick={handleOpen} startIcon={<InfoOutlinedIcon />}>
        View Current Topic Details
      </NewTopicButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Topic Name:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {roomDetails?.data().name}
          </Typography>
          <hr style={{marginBottom: 10, marginTop: 10}} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Topic Description:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {roomDetails?.data().description}
          </Typography>
          <hr style={{marginBottom: 10, marginTop: 10}} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Topic Time Estimate:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {roomDetails?.data().time}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default ViewTopic;

const NewTopicButton = styled(Button)`
  && {
    color: white;
    font-family: circular-bold;
    text-transform: none;
    cursor: pointer;
    background-color: var(--rendezvous-color);

    :hover {
      opacity: 0.8;
      background-color: var(--rendezvous-color);
    }
  }
`;
