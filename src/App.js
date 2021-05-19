import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Post from "./components/Post";
import FormPost from "./components/FormPost";
import Chat from "./components/Chat";

import styled from "styled-components";

import { Grid, Button } from "semantic-ui-react";
function App() {
  const Wrapper = styled.section`
    padding: 0em 4em;
  `;

  const TestBox = styled.div`
    border: 1px solid black;
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
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column width={3}>
                <Menu>
                  <h1>Menu</h1>
                  <MenuItem>
                    <Button fluid as={Link} to='/board'>
                      Board
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button fluid> MY BOOK </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button fluid as={Link} to='/form-post'>
                      POST MY BOOK
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button fluid as={Link} to='/chat'>
                      CHAT
                    </Button>
                  </MenuItem>
                </Menu>
              </Grid.Column>

              <Grid.Column width={13}>
                <ContentWrapper>
                  <Switch>
                    <Route path='/board'>
                      <Post />
                    </Route>
                    <Route path='/form-post'>
                      <FormPost />
                    </Route>
                    <Route path='/chat'>
                      <Chat />
                    </Route>
                  </Switch>
                </ContentWrapper>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Wrapper>
      </Router>
    </>
  );
}

export default App;
