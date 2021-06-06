import React, { useEffect, useState } from "react";

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

const Wrapper = styled(Segment)`
  border: 1px solid black;
  margin: 1em 0em;
  padding: 1em;
`;

const MetaData = styled.div`
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.875em;
`;

const Post = ({ book }) => {
  const [bookUser, setBookUser] = useState({});
  /**
   * name : ,
   * photoUrl : ,
   */
  const [comments, setComments] = useState([
    /**
     * userName : ,
     * userPhotoUrl : ,
     * timeStamp: ,
     * content : ,
     */
  ]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    console.log("book in Post");
    console.log(book);
    const db = firebase.firestore();
    const booksRef = db.collection("books").doc(book.key);

    if (book.userRef) {
      book.userRef.get().then((res) => {
        const user = res.data();
        console.log("user in book");
        console.log(user);
        setBookUser({
          name: user.displayName,
          photoURL: user.photoURL,
        });
        console.log(bookUser);
      });
    }
    // get data in book ref
    // const doc = await booksRef.get();
    // console.log(doc.data());

    // get comments
    // https://medium.com/firebase-tips-tricks/how-to-list-all-subcollections-of-a-cloud-firestore-document-17f2bb80a166
    // https://stackoverflow.com/a/47673346/14697633
    booksRef
      .collection("comments")
      .orderBy("timeStamp")
      .get()
      .then((commentsCol) => {
        console.log("comments in post");
        commentsCol.forEach((res) => {
          console.log(res.id, " => ", res.data());
          let comment = {};
          const data = res.data();
          if (data.userId) {
            data.userId.get().then((res) => {
              console.log("userId in comment");
              const user = res.data();
              console.log(user);
              comment["key"] = res.id;
              comment["userName"] = user.displayName;
              comment["userPhotoUrl"] = user.photoURL;
              comment["timeStamp"] = data.timeStamp.toDate().toDateString();
              // console.log(data.timeStamp.toDate().toDateString());
              comment["content"] = data.content;
              console.log("comment");
              console.log(comment);
              setComments([...comments, comment]);
              // console.log(comments);
            });
          }
        });
      });
  };
  return (
    <>
      <Wrapper>
        <Grid container>
          <Grid.Row>
            <Grid style={{ padding: "0em 1em" }}>
              <Grid.Column width={4}>
                <Image
                  // src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'
                  src={bookUser.photoURL}
                  size='small'
                  avatar
                />
              </Grid.Column>
              <Grid.Column width={12}>
                <h3>{bookUser.name}</h3>
                <MetaData> {book.timeStamp.toDate().toDateString()} </MetaData>
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
                <Comment>
                  <Comment.Avatar src={comment.userPhotoUrl} />
                  <Comment.Content>
                    <Comment.Author as='a'>{comment.userName}</Comment.Author>
                    <Comment.Metadata>
                      <div>{comment.timeStamp}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.content}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              );
            })}
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

          <Form reply>
            <Form.TextArea />
            <Button
              content='Add Reply'
              labelPosition='left'
              icon='edit'
              primary
            />
          </Form>
        </Comment.Group>
      </Wrapper>
    </>
  );
};

export default Post;
