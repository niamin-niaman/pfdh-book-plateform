import React from "react";

import { Link, useHistory } from "react-router-dom";

import styled from "styled-components";

import { Segment, Grid, Image, Button } from "semantic-ui-react";

import {
  useCollectionData,
  useDocumentOnce,
  useDocumentData,
  useCollection,
} from "react-firebase-hooks/firestore";

import firebase from "../../firebase";
import firebaseConfig from "../../firebase/config";

const Wrapper = styled(Segment)`
  padding: 1em;
`;

const ChatList = () => {
  const history = useHistory();
  let currUserId
  try {
    currUserId = firebase.auth().currentUser.uid;
  } catch (error) {
    history.push("/");
  }

  // const currUserId = firebase.auth().currentUser.uid;
  // get chat list
  const db = firebase.firestore();
  const messagesRef = db
    .collection("users")
    .doc(currUserId)
    .collection("chats");
  const query = messagesRef.orderBy("timeStamp").limitToLast(25);

  const [users] = useCollectionData(query, { idField: "id" });
  //   console.log(users);

  return (
    <>
      <Wrapper>
        <h1>Chat List</h1>
        {users && users.map((user) => <User key={user.id} user={user} />)}
      </Wrapper>
    </>
  );
};

const MetaData = styled.div`
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.875em;
`;

const User = ({ user }) => {
  console.log("user : ", user);
  const chatsId = user.chatsId;
  console.log("chatsId : ", chatsId);
  // user data
  const [userData, userLoading, userError] = useDocumentData(
    firebase.firestore().doc(`users/${user.userId}`)
  );
  //   console.log(userData);

  // subscribe
  // const db = firebase.firestore();
  // const messagesRef = db
  //   .collection("chats")
  //   .doc("Ar4ODMUyOP5J8n14pRGI")
  //   .collection("messages");
  // const query = messagesRef.orderBy("timeStamp").limitToLast(1);

  //   firebase.firestore
  //     .collection(`chats/Ar4ODMUyOP5J8n14pRGI/messages`)
  //     .orderBy("timeStamp")
  //     .limitToLast(1);

  const [messages] = useCollectionData(
    firebase
      .firestore()
      .collection(`chats/${chatsId}/messages`)
      //   .collection(`chats/Ar4ODMUyOP5J8n14pRGI/messages`)
      .orderBy("timeStamp")
      .limitToLast(1),
    { idField: "id" }
  );
  console.log(messages);

  return (
    <>
      <Grid
        as={Link}
        to={`chat/${chatsId}`}
        style={{
          padding: "0em 1em",
          maxHeigh: "85px",
          width: "100%",
          cursor: "pointer",
        }}
      >
        <Grid.Column width={2}>
          <Image
            // src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'
            src={userData && userData.photoURL}
            size='small'
            avatar
          />
        </Grid.Column>
        <Grid.Column width={13}>
          <h3>{userData && userData.displayName}</h3>
          <MetaData> {messages && messages[0].content} </MetaData>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default ChatList;
