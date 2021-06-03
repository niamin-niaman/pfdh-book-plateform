import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "./bookSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    // TODO Chat reducer
  },
});
