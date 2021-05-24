import React, { useRef, useState } from "react";

import styled from "styled-components";

import { Form, Button, Segment } from "semantic-ui-react";

const Wrapper = styled(Segment)`
  border: 1px solid black;
  padding: 1em;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FormPost = () => {
  const fileInputRef = useRef();
  const [file, setFile] = useState();

  const fileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    console.log("File chosen --->", file);
  };

  return (
    <>
      <Wrapper>
        <h1>Form Post</h1>
        <Form>
          <Form.Field>
            <label>ชื่อหนังสือ</label>
            <input placeholder='ชื่อหนังสือ' />
          </Form.Field>
          <Form.Field>
            <label>รายละเอียด</label>
            <Form.TextArea />
            <Flex>
              <Button
                content='Add Image'
                labelPosition='left'
                icon='file'
                onClick={() => fileInputRef.current.click()}
              />
              <input
                ref={fileInputRef}
                type='file'
                hidden
                onChange={fileChange}
              />
              {/* https://stackoverflow.com/a/55465547/14697633 */}
              <Button content='Post' labelPosition='left' icon='edit' primary />
            </Flex>
          </Form.Field>
        </Form>
      </Wrapper>
    </>
  );
};

export default FormPost;
