import React from "react";

import styled from "styled-components";

import { Grid, Image, Comment, Form, Header, Button } from "semantic-ui-react";

const Wrapper = styled.section`
  border: 1px solid black;
  padding: 1em;
`;

const Avatar = styled(Image)`
  text-alignment: center;
  padding: 1em;
`;

const Post = () => {
  return (
    <>
      <Wrapper>
        <Grid container>
          <Grid.Row>
            <Grid.Column width={2} centered>
              <Avatar src='/logo512.png' size='small' />
            </Grid.Column>
            <Grid.Column width={5} centered>
                <Grid.Row>
                  <span>Username</span>
                </Grid.Row>
                <Grid.Row>
                  <span>DD / MM / YYYY</span>
                </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10}>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column width={6}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
              nulla explicabo sequi odio, tempore enim vel deleniti ratione a
              fugiat iure doloremque velit repudiandae eum omnis. Dolor error
              alias eveniet tempore, ducimus architecto sequi aspernatur neque
              accusantium vel, facilis dolores ad, cumque quia dignissimos quis
              possimus repellendus! Exercitationem, doloribus ut.
            </Grid.Column>
         
          </Grid.Row>
        </Grid>
        <Comment.Group>
          <Header as='h3' dividing>
            Comments
          </Header>

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
            <Comment.Group>
              <Comment>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                <Comment.Content>
                  <Comment.Author as='a'>Jenny Hess</Comment.Author>
                  <Comment.Metadata>
                    <div>Just now</div>
                  </Comment.Metadata>
                  <Comment.Text>Elliot you are always so right :)</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
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
