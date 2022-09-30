import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../slices";

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export default store;
