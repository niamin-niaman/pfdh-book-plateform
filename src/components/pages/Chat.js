import React from "react";

import styled from "styled-components";

import { Comment, Form, Button } from "semantic-ui-react";

const Wrapper = styled.section`
  border: 1px solid black;
  padding: 1em;
`;

const MeMessage = styled(Comment)`
  text-align: end;
`;

const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Chat = () => {
  return (
    <>
      <Wrapper>
        <h1>Chat</h1>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>Jenny Hess</Comment.Author>
              <Comment.Metadata>
                <div>Just now</div>
              </Comment.Metadata>
              <Comment.Text>Elliot you are always so right :)</Comment.Text>
            </Comment.Content>
          </Comment>
          <MeMessage>
            <Comment.Content>
              <Comment.Author as='a'>Joe Henderson</Comment.Author>
              <Comment.Metadata>
                <div>5 days ago</div>
              </Comment.Metadata>
              <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
            </Comment.Content>
          </MeMessage>
        </Comment.Group>
        <Form>
          <Form.TextArea />
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

export default Chat;
