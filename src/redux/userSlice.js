import { createSlice } from "@reduxjs/toolkit";

import firebase from "../firebase";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      // const user = action.payload;
      const user = firebase.auth().currentUser.toJSON();
      // console.log(user);
      return { ...user };
    },
    resetUser: (state, action) => {
      return {};
    },
    /* note here add reducer return canbe return state */
    pocUser: (state, action) => {
      const data = action.payload;
      console.log("poc");
      console.log(data);

      const user = firebase.auth().currentUser.toJSON();
      console.log(user);
    },
  },
});

// export function
export const { pocUser, setUser, resetUser } = userSlice.actions;
// export reducer
export default userSlice.reducer;
