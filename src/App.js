import React from 'react';
import './App.css';
import { Header, Sidebar, Chat, Login } from './components';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

function App() {
  const [user, loading] = useAuthState(auth);
  
  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <h1>Welcome to Rendezvous!</h1>
          <Spinner name="ball-scale-ripple-multiple" color="purple" fadeIn="false"/>
        </AppLoadingContents>
      </AppLoading>
    )
  }

  return (
    <div className="app">
      {!user ? (<Login />) : (
        <>
          <Header />
          <AppBody>
            <Sidebar />
            <Chat />
          </AppBody>
        </>
      )}
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > h1 {
    font-family: circular-black;
    height: 50px;
    padding: 10px;
    margin-bottom: 40px;
  }
`;
