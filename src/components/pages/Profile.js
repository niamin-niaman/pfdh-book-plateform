import React from "react";

import styled from "styled-components";

import { Image, Button, Form , Segment } from "semantic-ui-react";

const Wrapper = styled(Segment)`
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const DisplayAvatar = styled.div`
  position: relative;
  display: flex;
`;
// https://stackoverflow.com/a/63818355/14697633

const Profile = () => {
  return (
    <>
      <Wrapper>
        <h1>Profile</h1>
        <DisplayAvatar>
          <Button
            circular
            icon='camera'
            style={{ position: "absolute", bottom: 0, right: 0, zIndex: 1 }}
          />
          <Image
            src='https://react.semantic-ui.com/images/wireframe/square-image.png'
            size='small'
            circular
          />
        </DisplayAvatar>
        <Form style={{ marginTop: 10 }}>
          <Form.Field>
            <label>Name</label>
            <input placeholder='Name' />
          </Form.Field>
          <Button fluid type='submit'>Submit</Button>
        </Form>
      </Wrapper>
    </>
  );
};

export default Profile;
