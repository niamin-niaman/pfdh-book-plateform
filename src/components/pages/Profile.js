import React, { useReducer, useState, useRef, useCallback } from "react";

import styled from "styled-components";

import {
  Image,
  Button,
  Form,
  Segment,
  Message,
  Modal,
  Header,
} from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice";

import firebase from "../../firebase";

import Cropper from "react-easy-crop";
import getCroppedImg from "../cropImage";
// https://codesandbox.io/s/q8q1mnr01w?file=/src/index.js:3029-3041

const Wrapper = styled(Segment)`
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const DisplayAvatar = styled.div`
  position: relative;
  display: flex;
`;

const CropContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

const ModalContent = styled(Modal.Content)`
  display: flex;
`;

// https://stackoverflow.com/a/63818355/14697633

const Profile = () => {
  // user reducer
  const user = useSelector((state) => state.user);

  // ETC
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // MODAL HANDLE
  const [open, setOpen] = React.useState(false);

  // AVARTAR HANDLER
  const fileInputRef = useRef();
  const [file, setFile] = useState();

  const fileChange = (e) => {
    console.log(e.target.files[0]);
    // setFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    // https://www.codegrepper.com/code-examples/javascript/react+display+image+from+input+file
    // https://codesandbox.io/s/04lz4580pl?file=/src/index.js:655-665
    setOpen(true);
    // open modal
    // console.log("File chosen --->", file);
  };
  // https://codesandbox.io/s/04lz4580pl?file=/src/index.js:655-665

  // SECTION CROPPER AND IMAGE HANDLER
  //#region
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
      setCroppedImage(URL.createObjectURL(croppedImage));
      // console.log(croppedImage);
      // TODO upload image to firebase
      const storage = firebase.storage();
      const uploadTask = storage
        .ref()
        .child(`profileImage/${user.uid}.png`)
        .put(croppedImage);

      // https://dev.to/itnext/how-to-do-image-upload-with-firebase-in-react-cpj
      uploadTask.on("state_changed", console.log, console.error, () => {
        storage
          .ref("profileImage")
          // .child(file.name)
          .child(`${user.uid}.png`)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            // setFile(null);
            // setURL(url);
            // TODO set diplayimage
            firebase
              .auth()
              .currentUser.updateProfile({
                photoURL: url,
              })
              .then(() => {
                dispatch(setUser());
              });

            // TODO chang imageUrl in firestore
            firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .set({ ...user, photoURL: url });
          });
      });
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, 0]);

  //#endregion
  // !SECTION
  // SECTION FORM HANDLER
  //#region
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

  const handleFormSubmit = (e) => {
    setLoading(true);

    function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }

    console.log(formInput);
    if (isEmpty(formInput)) {
      setLoading(false);
      console.log("form is empty");
      setErrMsg("form is empty");
      return;
    }

    // const user = firebase.auth().currentUser;
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: formInput.name,
      })
      .then(() => {
        const db = firebase.firestore();
        db.collection("users")
          .doc(user.uid)
          .set({
            ...user,
            displayName: formInput.name,
          });

        setLoading(false);
        dispatch(setUser());
      });
  };
  //#endregion
  // !SECTION

  return (
    <>
      {
        //#region
      }
      <Wrapper>
        <h1>Profile</h1>

        <h3>{user.displayName}</h3>
        <DisplayAvatar>
          <Button
            circular
            icon='camera'
            style={{ position: "absolute", bottom: 0, right: 0, zIndex: 1 }}
            onClick={() => fileInputRef.current.click()}
          />
          <Image
            avatar
            src={
              croppedImage
                ? croppedImage
                : // : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                  user.photoURL

              // TODO change to default image
              // TODO change in formRegister use this image to default image
            }
            size='small'
            circular
          />
          <input ref={fileInputRef} type='file' hidden onChange={fileChange} />
        </DisplayAvatar>
        <Form style={{ marginTop: 10 }} onSubmit={() => handleFormSubmit()}>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder='Name'
              name='name'
              onChange={(e) => handleInputChange(e)}
            />
          </Form.Field>
          <Button loading={loading} fluid type='submit'>
            Submit
          </Button>
        </Form>
        {errMsg ? <Message error content={errMsg} /> : ""}
      </Wrapper>
      {
        //#endregion
      }
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
              cropShape='round'
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

export default Profile;
