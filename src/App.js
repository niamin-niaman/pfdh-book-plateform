import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import FormLogin from "./components/FormLogin";
import { Chat, Profile, FormPost, Board, Admin } from "./components/pages";

import styled from "styled-components";

import { Grid, Button, Search } from "semantic-ui-react";
function App() {
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

  return (
    <>
      <Router>
        <Wrapper>
          <Switch>
            <Route path={"/login"}>
              <FormLogin />
            </Route>
            <>
              <Grid columns={2} divided>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Menu>
                      <h1>Menu</h1>
                      <Search
                      // loading={loading}
                      // onResultSelect={(e, data) =>
                      //   dispatch({
                      //     type: "UPDATE_SELECTION",
                      //     selection: data.result.title,
                      //   })
                      // }
                      // onSearchChange={handleSearchChange}
                      // results={results}
                      // value={value}
                      />
                      <MenuItem>
                        <Button fluid as={Link} to='/profile'>
                          Profile
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button fluid as={Link} to='/board'>
                          Board
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button fluid as={Link} to='/my-board'>
                          My book
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button fluid as={Link} to='/form-post'>
                          Post my book
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button fluid as={Link} to='/chat'>
                          Chat
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button fluid as={Link} to='/admin'>
                          Admin
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button fluid as={Link} to='/login'>
                          Login
                        </Button>
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
