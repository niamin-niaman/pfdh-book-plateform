import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import firebase from "./firebase";
import { pocFb, setUser, resetUser } from "./redux/userSlice";

import "./App.css";

import {
  Chat,
  Profile,
  FormPost,
  Board,
  Admin,
  FormLogin,
  FormRegister,
} from "./components/pages";

import styled from "styled-components";

import { Grid, Button, Search } from "semantic-ui-react";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        dispatch(
          setUser()
        );
      } else {
        // No user is signed in.
      }
    });
  }, []);

  const handleLogoutClick = () => {
    console.log("logout");
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        dispatch(resetUser());
        console.log(user);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const Wrapper = styled.section`
    padding: 0em 4em;
  `;

  const Menu = styled.div`
    display: flex;
    text-align: center;
    content-justify: center;
    flex-direction: column;
  `;

  const MenuItem = styled.div`
    margin: 1em 0em;
    min-width: 100%;
  `;

  const ContentWrapper = styled.div`
    margin: 2em;
  `;

  const SearchWrapper = styled(Search)`
    .ui.icon.input > input {
      width: 100%;
    }
  `;

  return (
    <>
      <Router>
        <Wrapper>
          <Switch>
            <Route path={"/login"}>
              <FormLogin />
            </Route>
            <Route path={"/register"}>
              <FormRegister />
            </Route>
            <>
              <Grid columns={2} divided>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Menu>
                      <h1>Menu</h1>
                      <MenuItem>
                        <SearchWrapper fluid />
                      </MenuItem>

                      <MenuItem>
                        <Button primary fluid as={Link} to='/profile'>
                          Profile
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button primary fluid as={Link} to='/board'>
                          Board
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button primary fluid as={Link} to='/my-board'>
                          My book
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button primary fluid as={Link} to='/form-post'>
                          Post my book
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button primary fluid as={Link} to='/chat'>
                          Chat
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button color='blue' fluid as={Link} to='/admin'>
                          Admin
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        {Object.keys(user).length ? (
                          <Button color='red' fluid onClick={handleLogoutClick}>
                            Logout
                          </Button>
                        ) : (
                          <Button color='green' fluid as={Link} to='/login'>
                            Login
                          </Button>
                        )}
                      </MenuItem>
                    </Menu>
                  </Grid.Column>

                  <Grid.Column width={13}>
                    <ContentWrapper>
                      <Route path='/board'>
                        <Board />
                      </Route>
                      <Route path='/my-board'>
                        <Board />
                      </Route>
                      <Route path='/form-post'>
                        <FormPost />
                      </Route>
                      <Route path='/chat'>
                        <Chat />
                      </Route>
                      <Route path='/profile'>
                        <Profile />
                      </Route>
                      <Route path='/admin'>
                        <Admin />
                      </Route>
                    </ContentWrapper>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </>
          </Switch>
        </Wrapper>
      </Router>
    </>
  );
}

export default App;
