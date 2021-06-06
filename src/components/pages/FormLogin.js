import React, { useReducer, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

import { BrowserRouter as Router, useHistory, Link } from "react-router-dom";

import firebase from "../../firebase";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

const FormLogin = () => {
  // ANCHOR ETC
  let history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // SECTION FORM HANDLER
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

  const handleFromSubmit = (e) => {
    console.log(formInput);
    setIsLoading(true);
    const { email, password } = formInput;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // console.log(user.toJSON());
        dispatch(setUser());
        // ...
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        var errorCode = error.code;
        var errorMessage = error.message;
        setErrMsg(errorMessage);
        // ..
      });
  };
  // !SECTION

  // if already login
  if (Object.keys(user).length) {
    console.log(user);
    history.push("/board");
  }

  return (
    <Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' textAlign='center'>
          Log-in to your account
        </Header>
        <Form size='large' onSubmit={handleFromSubmit}>
          <Message
            error
            header='Action Forbidden'
            content='You can only sign up for an account once with a given e-mail address.'
          />
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              name='email'
              onChange={(e) => handleInputChange(e)}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
              onChange={(e) => handleInputChange(e)}
            />

            <Button loading={isLoading} fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        {errMsg ? (
          <Message
            error
            content='You can only sign up for an account once with a given e-mail address.'
          />
        ) : (
          ""
        )}
        <Message>
          New to us?
          <Link to='/register'>Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default FormLogin;
