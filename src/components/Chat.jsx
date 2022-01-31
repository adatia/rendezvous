import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectTopicId } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { query, collection, doc, orderBy } from "firebase/firestore";
import { db } from '../firebase';
import Message from './Message';

function Chat() {
  const chatRef = useRef(null);
  const topicId = useSelector(selectTopicId);
  const [topicDetails] = useDocument(
    topicId && doc(db, 'topics', topicId)
  );
  
  const [topicMessages, loading] = useCollection(
    topicId && query(collection(db, 'topics', topicId, 'messages'), orderBy('timestamp'))
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [topicId, loading]);


  return (
    <ChatContainer>
      {topicDetails && topicMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4><strong>{topicDetails?.data().name} Chat Session</strong></h4>
            </HeaderLeft>
          </Header>
          <ChatMessages>
            {topicMessages?.docs.map(doc => {
              const { message, timestamp, user, userImage } = doc.data()

              return (
                <Message key={doc.id} message={message} timestamp={timestamp} user={user} userImage={userImage} />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>

          <ChatInput chatRef={chatRef} topicName={topicDetails?.data().name} topicId={topicId} />
        </>
      )}
    </ChatContainer>
  );
}

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 10px;
  }
`;

const ChatMessages = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
