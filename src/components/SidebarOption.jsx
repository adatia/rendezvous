import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../features/appSlice';
import { Tooltip } from '@mui/material';
import EditTopic from './EditTopic';
import DeleteTopic from './DeleteTopic';

function SidebarOption({ title, id, index }) {
  const dispatch = useDispatch();

  const selectMeeting = () => {
    if (id) {
      dispatch(enterRoom({
        roomId: id,
      }))
    }
  };

  return (
    <SidebarOptionContainer>
      <Tooltip title={`Go to meeting topic ${title}`}>
        <div className='title' onClick={selectMeeting}>
          <h3>{index + 1}. {title}</h3>
        </div>
      </Tooltip>
      <ModificationButtons>
        <EditTopic title={title} id={id} />
        <DeleteTopic title={title} id={id} />
      </ModificationButtons>
    </SidebarOptionContainer>
  );
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 8px;

  > .title {
    padding-left: 10px;
    font-weight: 500;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    font-family: circular-book;
  }

  > .title > span {
    padding-right: 15px;
  }

  > .title:hover {
    opacity: 0.8;
  }
`;

const ModificationButtons = styled.div`
  display: flex;
  align-items: center;

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
