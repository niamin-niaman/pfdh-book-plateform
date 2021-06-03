import { createSlice } from "@reduxjs/toolkit";

import firebase from "../firebase";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      return { ...user };
    },
    resetUser: (state, action)=>{
      return {}
    },
    /* note here add reducer return canbe return state */
    pocFb: (state, action) => {
      const data = action.payload;
      console.log(data);
      const db = firebase.firestore();
      const docRef = db.collection("users").doc(data.email);
      docRef.set({
        email: data.email,
      });
    },
  },
});

// export function
export const { setUser, pocFb , resetUser} = userSlice.actions;
// export reducer
export default userSlice.reducer;
