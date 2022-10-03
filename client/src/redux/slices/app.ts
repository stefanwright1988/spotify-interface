import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    navActive: true,
  },
  reducers: {
    toggleNav: (state) => {
      state.navActive = !state.navActive;
    },
  },
});

export default appSlice;
