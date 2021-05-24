import React from "react";

import styled from "styled-components";

import { Grid, Image, Segment, Label } from "semantic-ui-react";

const Wrapper = styled(Segment)`
  border: 1px solid black;
  padding: 1em;
`;
const Item = { margin: "1em 0em", padding: "0.5em" };

const postContent =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione, explicabo accusantium, voluptate voluptatum quia architecto expedita aperiam ipsam accusamus ab a. Ad eos quisquam, velit, provident aspernatur rerum, atque dicta iste perspiciatis quam sed. Omnis, quo exercitationem, placeat accusantium consectetur sapiente nulla est voluptatum rem veritatis consequuntur fuga numquam a corporis itaque saepe laboriosam consequatur tempora expedita rerum velit fugiat. Beatae quia facere eaque ratione magnam. Aliquid ipsam omnis quo.";
// Create PostItem
const PostItem = () => {
  return (
    <div style={Item}>
      <Segment>
        <h3>ชื่อหนังสือ</h3>
        <Grid>
          <Grid.Column width={4}>
            <Image
              src='https://react.semantic-ui.com/images/wireframe/image.png'
              fluid
            />
          </Grid.Column>
          <Grid.Column width={12}>
            {" "}
            {`${postContent.substring(0, 50)}...`}
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
};

// Create UserItem
const UserItem = () => {
  return (
    <>
      <div style={Item}>
        <Segment>
          <Grid>
            <Grid.Column width={4}>
              <Image
                src='https://react.semantic-ui.com/images/wireframe/image.png'
                fluid
              />
            </Grid.Column>
            <Grid.Column width={12}>
              <h3>UserItem</h3>
              <Label size='tiny' color='teal'>
                Admin
              </Label>
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    </>
  );
};

const Admin = () => {
  return (
    <>
      <Wrapper>
        <h1>Admin</h1>
        <Grid container columns='equal'>
          <Grid.Column>
            <h1>Post</h1>
            <PostItem />
            <PostItem />
            <PostItem />
          </Grid.Column>
          <Grid.Column>
            <h1>User</h1>
            <UserItem />
            <UserItem />
            <UserItem />
          </Grid.Column>
        </Grid>
      </Wrapper>
    </>
  );
};

export default Admin;
