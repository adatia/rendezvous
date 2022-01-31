import React from 'react';
import styled from 'styled-components';
import { Avatar, Tooltip } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth'
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
  const [user] = useAuthState(auth);

  return (
    <HeaderContainer>

      <HeaderLeft>
        <Avatar src={user?.photoURL} alt={user?.displayName} />
      </HeaderLeft>

      <HeaderSearch>
        <GroupsIcon />
        <h2>Rendezvous</h2>
      </HeaderSearch>

      <HeaderRight>
        <Tooltip title='Logout'>
          <LogoutIcon onClick={() => signOut(auth)} />
        </Tooltip>
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--rendezvous-color);
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  text-align: center;
  display: flex;
  justify-content: center;
  color: white;

  > h2 {
    font-family: circular-medium;
  }

  > .MuiSvgIcon-root {
    font-size: 30px;
    margin-right: 10px;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }

  .MuiSvgIcon-root:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
