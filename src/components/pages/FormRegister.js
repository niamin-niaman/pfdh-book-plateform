import React, { useReducer, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

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
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let history = useHistory();
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
    setIsLoading(true);

    function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }
    // console.log(formInput);
    if (isEmpty(formInput)) {
      setErrMsg("form is empty");
      setIsLoading(false);
      return;
    }

    const { name, email, password, confirmPassword } = formInput;
    console.log(name);
    if (!name) {
      setErrMsg("Name is empty");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setErrMsg("Password not match");
      setIsLoading(false);
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;

        // NOTE Create user DOC into firestore
        // console.log(user.toJSON());
        const db = firebase.firestore();
        db.collection("users")
          .doc(user.toJSON().uid)
          .set({
            ...user.toJSON(),
            displayName: name,
            photoURL:
              "https://react.semantic-ui.com/images/wireframe/square-image.png",
          });

        // Update display name
        user.updateProfile({
          displayName: name,
          photoURL:
            "https://react.semantic-ui.com/images/wireframe/square-image.png",
        });

        // NOTE in useEffect on APP component always check is login ?
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

  // check if user already login
  if (Object.keys(user).length) {
    // console.log(user);
    history.push("/");
  }

  return (
    <Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' textAlign='center'>
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

            <Button loading={isLoading} fluid size='large'>
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
