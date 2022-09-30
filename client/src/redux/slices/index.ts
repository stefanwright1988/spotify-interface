import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    navActive: true,
  },
  reducers: {
    toggleNav: (state, action) => {
      state.navActive = action.payload;
    },
  },
});

export default appSlice;
