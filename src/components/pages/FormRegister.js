import React, { useReducer, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { pocFb, setUser } from "../../redux/userSlice";

import { BrowserRouter as Router, useHistory, Link } from "react-router-dom";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

import firebase from "../../firebase";

const FormLogin = () => {
  // local Reducer
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {}
  );

  // Hook
  let history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // local state
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleInputChange = ({ target: { name, value } }) => {
    setFormInput({ [name]: value });
  };

  const handleFromSubmit = (e) => {
    console.log(formInput);
    setIsLoading(true);
    const { email, password, confirmPassword } = formInput;
    if (password !== confirmPassword) {
      setErrMsg("Password not match");
      setIsLoading(false);
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user.toJSON());
        dispatch(
          setUser({
            ...user.toJSON(),
          })
        );

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

  if (Object.keys(user).length) {
    console.log(user);
    history.push("/");
  }

  return (
    <Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Register New Account
        </Header>
        <Form size='large' onSubmit={(e) => handleFromSubmit(e)}>
          <Segment stacked>
            <Form.Input
              fluid
              icon='info'
              iconPosition='left'
              placeholder='Name'
              name='name'
              onChange={(e) => handleInputChange(e)}
            />
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
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Confirm Password'
              type='password'
              name='confirmPassword'
              onChange={(e) => handleInputChange(e)}
            />

            <Button loading={isLoading} color='teal' fluid size='large'>
              Register
            </Button>
          </Segment>
        </Form>
        {errMsg ? <Message error content={errMsg} /> : ""}
        <Message>
          Already have account?
          <Link to='/login'>Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default FormLogin;
