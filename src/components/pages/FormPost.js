import React, { useRef, useState, useReducer, useCallback } from "react";

import { useSelector } from "react-redux";

import styled from "styled-components";

import { Form, Button, Segment, Image, Modal } from "semantic-ui-react";

import firebase from "../../firebase";

import Cropper from "react-easy-crop";
import getCroppedImg from "../cropImage";
import { useHistory } from "react-router";

const Wrapper = styled(Segment)`
  border: 1px solid black;
  padding: 1em;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CropContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

const ModalContent = styled(Modal.Content)`
  display: flex;
`;

const DisplayImage = styled.div`
  position: relative;
  display: flex;
`;

const FormPost = () => {
  const fileInputRef = useRef();
  const [file, setFile] = useState();

  const fileChange = (e) => {
    console.log(e.target.files[0]);
    // setFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    console.log("File chosen --->", file);
    setOpen(true);
  };

  // TODO add cropper to handle image

  // TODO upload image to storage

  // TODO handle form & write data to firestore

  const [isLoading, setIsLoading] = useState(false);

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    {}
  );

  const user = useSelector((state) => state.user);

  const history = useHistory();

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
      // setErrMsg("form is empty");
      setIsLoading(false);
      return;
    }

    console.log(formInput);

    const uniqFilename = new Date().getTime().toString(36);
    //stackoverflow.com/a/57593036/14697633

    console.log(uniqFilename);

    console.log(croppedImage);

    // TODO upload image to firebase
    const storage = firebase.storage();
    const uploadTask = storage
      .ref()
      .child(`bookImage/${uniqFilename}.jpg`)
      .put(croppedImage);

    // https://dev.to/itnext/how-to-do-image-upload-with-firebase-in-react-cpj
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("bookImage")
        // .child(file.name)
        .child(`${uniqFilename}.jpg`)
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          // setFile(null);
          // setURL(url);

          // TODO write to firestore
          const db = firebase.firestore();
          db.collection("books")
            .add({
              name: formInput.name,
              contents: formInput.content,
              timeStamp: firebase.firestore.Timestamp.now(),
              photoUrl: url,
              userRef: db.doc(`users/${firebase.auth().currentUser.uid}`),
            })
            .then((bookRef) => {
              setIsLoading(false);
              console.log("Success");
              history.push("/board");
            });
        });
    });
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(file, croppedAreaPixels, 0);
      console.log("done", { croppedImage });
      // setCroppedImage(URL.createObjectURL(croppedImage));
      setCroppedImage(croppedImage);
      console.log(croppedImage);
      // TODO upload image to firebase
      // const storage = firebase.storage();
      // const uploadTask = storage
      //   .ref()
      //   .child(`profileImage/${user.uid}.png`)
      //   .put(croppedImage);

      // https://dev.to/itnext/how-to-do-image-upload-with-firebase-in-react-cpj
      // uploadTask.on("state_changed", console.log, console.error, () => {
      //   storage
      //     .ref("profileImage")
      //     // .child(file.name)
      //     .child(`${user.uid}.png`)
      //     .getDownloadURL()
      //     .then((url) => {
      //       console.log(url);
      //       // setFile(null);
      //       // setURL(url);
      //     });
      // });
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, 0]);

  // MODAL HANDLE
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Wrapper>
        <h1>Form Post</h1>
        <Form loading={isLoading}>
          <Form.Field>
            <label>ชื่อหนังสือ</label>
            <input
              name='name'
              onChange={(e) => {
                handleInputChange(e);
              }}
              placeholder='ชื่อหนังสือ'
            />
          </Form.Field>
          <Form.Field>
            <label>รายละเอียด</label>
            <Form.TextArea
              name='content'
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            <Flex>
              {!croppedImage ? (
                <Button
                  content='Add Image'
                  labelPosition='left'
                  icon='file'
                  onClick={() => fileInputRef.current.click()}
                />
              ) : (
                <DisplayImage>
                  <Button
                    circular
                    icon='close'
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      zIndex: 1,
                      margin: 0,
                    }}
                    onClick={() => setCroppedImage(null)}
                  />
                  <Image
                    src={URL.createObjectURL(croppedImage)}
                    size='small'
                    onClick={() => setOpen(true)}
                    style={{ cursor: "pointer" }}
                  />
                </DisplayImage>
              )}
              <input
                ref={fileInputRef}
                type='file'
                hidden
                onChange={fileChange}
              />
              {/* https://stackoverflow.com/a/55465547/14697633 */}
              <Button
                style={{ maxHeight: "35px" }}
                content='Post'
                labelPosition='left'
                icon='edit'
                primary
                onClick={handleFromSubmit}
              />
            </Flex>
          </Form.Field>
        </Form>
      </Wrapper>

      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        // trigger={<Button>Show Modal</Button>}
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <ModalContent>
          {/* <Image
            size='medium'
            // src='https://react.semantic-ui.com/images/avatar/large/rachel.png'
            src={file}
            wrapped
          /> */}
          <CropContainer>
            <Cropper
              image={file}
              crop={crop}
              onCropChange={setCrop}
              aspect={1}
              zoom={zoom}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </CropContainer>
        </ModalContent>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content='Finish'
            labelPosition='right'
            icon='checkmark'
            onClick={() => {
              setOpen(false);
              showCroppedImage();
            }}
            positive
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default FormPost;
