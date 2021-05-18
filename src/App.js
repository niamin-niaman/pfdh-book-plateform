import "./App.css";
import Post from "./components/Post";

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
      <Wrapper>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column width={3}>
              <Menu>
                <h1>Menu</h1>
                <MenuItem>
                  <Button fluid> Board </Button>
                </MenuItem>
                <MenuItem>
                  <Button fluid> MY BOOK </Button>
                </MenuItem>
                <MenuItem>
                  <Button fluid> POST MY BOOK </Button>
                </MenuItem>
                <MenuItem>
                  <Button fluid> CHAT </Button>
                </MenuItem>
              </Menu>
            </Grid.Column>

            <Grid.Column width={13}>
              <ContentWrapper>
                <Post />
              </ContentWrapper>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    </>
  );
}

export default App;
