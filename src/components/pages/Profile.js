import React, { useReducer, useState } from "react";

import styled from "styled-components";

import { Image, Button, Form, Segment } from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";

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
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {}
  );

  const handleInputChange = ({ target: { name, value } }) => {
    setFormInput({ [name]: value });
  };

  const [errMsg, setErrMsg] = useState("");

  const handleFormSubmit = (e) => {
    // setIsLoading(true);

    function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }
    console.log(formInput);
    if (isEmpty(formInput)) {
      setErrMsg("form is empty");
      // setIsLoading(false);
      return;
    }

  };

  return (
    <>
      <Wrapper>
        <h1>Profile</h1>
        <h3>{user.displayName}</h3>
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
        <Form style={{ marginTop: 10 }} onSubmit={() => handleFormSubmit()}>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder='Name'
              name='name'
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Field>
          <Button fluid type='submit'>
            Submit
          </Button>
        </Form>
      </Wrapper>
    </>
  );
};

export default Profile;
