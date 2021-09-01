import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import styled from "styled-components";

import firebase from "../firebase";

import {
  Grid,
  Image,
  Comment,
  Form,
  Header,
  Button,
  Segment,
} from "semantic-ui-react";
import { Link, Redirect, useHistory } from "react-router-dom";

const Wrapper = styled(Segment)`
  border: 1px solid black;
  margin: 1em 0em;
  padding: 1em;
`;

const MetaData = styled.div`
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.875em;
`;

const Post = ({ book, onDeleteBook }) => {
  let history = useHistory();
  const user = useSelector((state) => state.user);
  // get data from book user firestore
  const [bookUser, setBookUser] = useState({});
  /**
   * name : ,
   * photoUrl : ,
   */
  // get data from comments firestore
  const [comments, setComments] = useState([]);
  /**
   * userName : ,
   * userPhotoUrl : ,
   * timeStamp: ,
   * content : ,
   */

  // handle comment form
  const [comment, setComment] = useState();

  const fetchComments = async () => {
    // console.log("book in Post");
    // console.log(book);
    const db = firebase.firestore();
    const booksRef = db.collection("books").doc(book.key);

    if (book.userRef) {
      const bookUserRef = await book.userRef.get();
      const user = bookUserRef.data();
      // console.log("user in book");
      // console.log(user);
      setBookUser({
        name: user.displayName,
        photoURL: user.photoURL,
        userId: bookUserRef.id,
      });
      // console.log(bookUser);
    }

    // get comments
    // https://medium.com/firebase-tips-tricks/how-to-list-all-subcollections-of-a-cloud-firestore-document-17f2bb80a166
    // https://stackoverflow.com/a/47673346/14697633
    const commentsCol = await booksRef
      .collection("comments")
      // .orderBy("timeStamp", "desc")
      .orderBy("timeStamp")
      .get();

    // console.log("comments in post");
    const commentsTmp = [];

    // commentsCol.forEach(async (res) => {
    for (const res of commentsCol.docs) {
      // https://dev.to/gautemeekolsen/til-firestore-get-collection-with-async-await-a5l
      // console.log(res.id, " => ", res.data());
      let comment = {};
      const data = res.data();
      if (data.userId) {
        const commentsUserRef = await data.userId.get();
        // console.log("userId in comment");
        const user = commentsUserRef.data();
        // console.log(user);
        comment["key"] = res.id;
        comment["userName"] = user.displayName;
        comment["userPhotoUrl"] = user.photoURL;
        comment["timeStamp"] = data.timeStamp.toDate().toDateString();
        // console.log(data.timeStamp.toDate().toDateString());
        comment["content"] = data.content;
        comment["userId"] = commentsUserRef.id;
        // console.log("comment");
        // console.log(comment);
        // console.log(comments);
      }
      commentsTmp.push(comment);
      setComments([...commentsTmp]);
      // });
    }
    // console.log("commentsTmp");
    // console.log(commentsTmp);
    // console.log(commentsTmp);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleFormSubmit = async () => {
    if (!comment) {
      console.log("comment is empty");
      return;
    }
    console.log(comment);
    // TODO add to comment collection with timeStamp
    const db = firebase.firestore();
    const booksRef = db.collection("books").doc(book.key);
    const commentRef = await booksRef.collection("comments").add({
      content: comment,
      timeStamp: firebase.firestore.Timestamp.now(),
      userId: db.doc(`users/${firebase.auth().currentUser.uid}`),
    });
    console.log("comment !");
    console.log(await commentRef.get());
    const commentData = (await commentRef.get()).data();
    console.log(commentData);
    let commentTmp = {};
    if (commentData.userId) {
      const commentsUserRef = await commentData.userId.get();
      // console.log("userId in comment");
      const user = commentsUserRef.data();
      // console.log(user);
      commentTmp["key"] = (await commentRef.get()).id;
      commentTmp["userName"] = user.displayName;
      commentTmp["userPhotoUrl"] = user.photoURL;
      commentTmp["timeStamp"] = commentData.timeStamp.toDate().toDateString();
      // console.log(commentData.timeStamp.toDate().toDateString());
      commentTmp["content"] = commentData.content;
      commentTmp["userId"] = firebase.auth().currentUser.uid;
      console.log("commentTmp");
      console.log(commentTmp);
      // console.log(comments);
    }
    setComments([...comments, commentTmp]);
    // fetchComments();
    setComment("");
  };

  const handleCommentDelete = (key) => {
    console.log(key);
    const db = firebase.firestore();
    const commentRef = db
      .collection("books")
      .doc(book.key)
      .collection("comments")
      .doc(key);
    commentRef.delete().then(() => {
      setComments(comments.filter((comment) => comment.key !== key));
    });
  };

  const handleUserClick = (userId) => {
    if (!firebase.auth().currentUser) return;
    console.log("userId :");
    console.log(userId);
    const currUserId = firebase.auth().currentUser.uid;
    console.log("currUserId");
    console.log(currUserId);
    if (userId === currUserId) return;
    console.log("userId slice");
    const sliceUserId = userId.slice(0, userId.length / 2);
    console.log(sliceUserId);
    console.log("currUserId slice");
    const slicecurrUserId = currUserId.slice(0, currUserId.length / 2);
    console.log(slicecurrUserId);
    console.log("compare");
    console.log(sliceUserId.localeCompare(slicecurrUserId));

    let chatId;
    switch (sliceUserId.localeCompare(slicecurrUserId)) {
      case 0:
        break;
      case -1:
        chatId = slicecurrUserId + "" + sliceUserId;
        break;
      case 1:
        chatId = sliceUserId + "" + slicecurrUserId;
        break;
      default:
        break;
    }

    console.log(chatId);

    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("chats")
      .doc(currUserId)
      .set({
        chatsId: chatId,
        timeStamp: firebase.firestore.Timestamp.now(),
        userId: currUserId,
      });

    firebase
      .firestore()
      .collection("users")
      .doc(currUserId)
      .collection("chats")
      .doc(userId)
      .set({
        chatsId: chatId,
        timeStamp: firebase.firestore.Timestamp.now(),
        userId: userId,
      });

    history.push("/chat/" + chatId);
  };

  return (
    <>
      <Wrapper>
        <Grid container>
          <Grid.Row>
            <Grid
              style={{ padding: "0em 1em", maxHeigh: "85px", width: "100%" }}
            >
              <Grid.Column width={2}>
                <Image
                  // src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'
                  src={bookUser.photoURL}
                  size='small'
                  avatar
                />
              </Grid.Column>
              <Grid.Column width={13}>
                <h3
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleUserClick(bookUser.userId);
                  }}
                >
                  {bookUser.name}
                </h3>
                <MetaData> {book.timeStamp.toDate().toDateString()} </MetaData>
              </Grid.Column>
              <Grid.Column width={1}>
                {Object.keys(user).length && bookUser.userId === user.uid ? (
                  <Button
                    circular
                    icon='trash alternate'
                    onClick={() => {
                      onDeleteBook(book.key);
                    }}
                  />
                ) : (
                  ""
                )}
              </Grid.Column>
            </Grid>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <Image
                // src='https://react.semantic-ui.com/images/wireframe/image.png'
                src={book.photoUrl}
                size='medium'
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <h3> {book.name}</h3>
              {book.contents}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Comment.Group>
          <Header as='h3' dividing>
            Comments
          </Header>

          {comments &&
            comments.map((comment) => {
              return (
                <Comment key={comment.key}>
                  <Comment.Avatar src={comment.userPhotoUrl} />
                  <Comment.Content>
                    <Comment.Author
                      as='a'
                      onClick={() => {
                        handleUserClick(comment.userId);
                      }}
                    >
                      {comment.userName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{comment.timeStamp}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.content}</Comment.Text>
                    {Object.keys(user).length && comment.userId === user.uid ? (
                      <Comment.Actions>
                        {/* <Comment.Action>Edit</Comment.Action> */}
                        <Comment.Action
                          onClick={() => {
                            handleCommentDelete(comment.key);
                          }}
                        >
                          Delete
                        </Comment.Action>
                      </Comment.Actions>
                    ) : (
                      ""
                    )}
                  </Comment.Content>
                </Comment>
              );
            })}
          {/* 
          //#region 
            <Comment>
              <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>Matt</Comment.Author>
                <Comment.Metadata>
                  <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>How artistic!</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>

            <Comment>
              <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>Elliot Fu</Comment.Author>
                <Comment.Metadata>
                  <div>Yesterday at 12:30AM</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>
                    This has been very useful for my research. Thanks as well!
                  </p>
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>

            <Comment>
              <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>Joe Henderson</Comment.Author>
                <Comment.Metadata>
                  <div>5 days ago</div>
                </Comment.Metadata>
                <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment> 
          //#endregion
          */}

          {Object.keys(user).length ? (
            <Form
              reply
              onSubmit={() => {
                handleFormSubmit();
              }}
            >
              <Form.TextArea
                name='comment'
                value={comment}
                onChange={({ target: { value } }) => {
                  setComment(value);
                }}
              />
              <Button
                content='Add Reply'
                labelPosition='left'
                icon='edit'
                primary
              />
            </Form>
          ) : (
            ""
          )}
        </Comment.Group>
      </Wrapper>
    </>
  );
};

export default Post;
