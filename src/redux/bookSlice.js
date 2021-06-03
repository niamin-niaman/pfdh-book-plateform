import { createSlice } from "@reduxjs/toolkit";

import firebase from "../firebase";

const bookSlice = createSlice({
  name: "book",
  initialState: {},
  reducers: {
    pocBook: (state, action) => {
      const data = action.payload;
      console.log("POC BOOK");
      console.log(data);
      return {};
    },
  },
});

// export function
export const { pocBook } = bookSlice.actions;
// export reducer
export default bookSlice.reducer;
