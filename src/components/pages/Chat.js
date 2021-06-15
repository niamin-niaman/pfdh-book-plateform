import React, { useEffect, useRef } from "react";

import { useHistory, useLocation, useParams } from "react-router-dom";

import styled from "styled-components";

import { Comment, Form, Button, Segment } from "semantic-ui-react";

import firebase from "../../firebase";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { useState } from "react";

const Wrapper = styled(Segment)`
  padding: 1em;
`;

const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Chat = () => {

  let { chatId } = useParams();
  console.log('chatId : ',chatId);

  // subscribe
  const db = firebase.firestore();
  const messagesRef = db.collection("chats").doc(chatId).collection("messages");
  const query = messagesRef.orderBy("timeStamp").limitToLast(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  console.log(messages);

  // comment

  const [comment, setComment] = useState("");

  const onSubmitComment = () => {
    if (!comment) return;
    console.log(comment);
    messagesRef.add({
      content: comment,
      from: firebase.auth().currentUser.uid,
      timeStamp: firebase.firestore.Timestamp.now(),
    });
    setComment("");
  };

  // history
  let history = useHistory();

  // scrollable
  const dummy = useRef(null);
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <Wrapper>
        <h1>Chat</h1>
        <Comment.Group style={{ height: "60vh", overflow: "auto" }}>
          {/* <Comment>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>Jenny Hess</Comment.Author>
              <Comment.Metadata>
                <div>Just now</div>
              </Comment.Metadata>
              <Comment.Text>Elliot you are always so right :)</Comment.Text>
            </Comment.Content>
          </Comment> */}
          {messages &&
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          {/* <Comment style={{ textAlign: "end" }}>
            <Comment.Content>
              <Comment.Author as='a'>Joe Henderson</Comment.Author>
              <Comment.Metadata>
                <div>5 days ago</div>
              </Comment.Metadata>
              <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
            </Comment.Content>
          </Comment> */}
          <span ref={dummy}></span>
        </Comment.Group>
        <Form onSubmit={onSubmitComment}>
          <Form.TextArea
            value={comment}
            onChange={({ target: { value } }) => {
              setComment(value);
            }}
          />
          <Flex>
            <Button
              content='Send Message'
              labelPosition='left'
              icon='send'
              primary
            />
          </Flex>
        </Form>
      </Wrapper>
    </>
  );
};

const ChatMessage = ({ message }) => {
  firebase.auth();
  // isSend = false ; this message is Received
  // let isSend = false;

  let history = useHistory();

  let isSend;
  try {
    isSend = firebase.auth().currentUser.uid === message.from;
  } catch (error) {
    history.push("/");
  }
  let displayName;
  try {
    displayName = firebase.auth().currentUser.displayName;
  } catch (error) {
    history.push("/");
  }

  const [name, setName] = useState(displayName);
  const [photoURL, setPhotoURL] = useState("");

  console.log(message.from);

  if (!isSend) {
    firebase
      .firestore()
      .collection("users")
      .doc(message.from)
      .get()
      .then((userRef) => {
        const user = userRef.data();
        if (typeof user !== "undefined" && user) {
          console.log(user);
          setName(user.displayName);
          setPhotoURL(user.photoURL);
        }
      });
  }

  // console.log(message);
  // console.log(firebase.auth().currentUser.uid);

  return (
    <>
      <Comment style={isSend ? { textAlign: "end" } : {}}>
        {!isSend && <Comment.Avatar src={photoURL} />}
        <Comment.Content>
          <Comment.Author as='a'>{name}</Comment.Author>
          <Comment.Metadata>
            <div>Just now</div>
          </Comment.Metadata>
          <Comment.Text>{message.content}</Comment.Text>
        </Comment.Content>
      </Comment>
    </>
  );
};

export default Chat;
