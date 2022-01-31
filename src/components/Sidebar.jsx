import React from 'react';
import styled from 'styled-components';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SidebarOption from './SidebarOption';
import { auth, db } from '../firebase';
import { collection, query, orderBy, serverTimestamp } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import NewTopic from './NewTopic';
import ViewTopic from './ViewTopic';

function Sidebar() {
  const [topics, loading, error] = useCollection(query(collection(db, "topics"), orderBy('timestamp')));
  const [user] = useAuthState(auth);

  return (
    <SiderbarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Agenda for {new Date().toISOString().split('T')[0]}</h2>
          <h3>
            <FiberManualRecordIcon />
            {user.displayName}
          </h3>
        </SidebarInfo>
        <NewTopic />
      </SidebarHeader>

      <SidebarTopic>
        <ViewTopic />
      </SidebarTopic>

      {topics?.docs.map((doc, index) => {
        return <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} index={index} />;
      })}
    </SiderbarContainer>
  );
}

export default Sidebar;

const SiderbarContainer = styled.div`
  color: white;
  background-color: var(--rendezvous-color);
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;

  > hr {
    margin-top: 5px;
    margin-bottom: 5px;
    border: 1px solid #49274b;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;
  align-items: center;
`;

const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 16px;
    font-weight: 900;
    margin-bottom: 5px;
    font-family: circular-medium;
  }

  > h3 {
    display: flex;
    font-size: 14px;
    font-weight: 400;
    align-items: center;
    font-family: circular-light
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;

const SidebarTopic = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;
  align-items: center;
`;
