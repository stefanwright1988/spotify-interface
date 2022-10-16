import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    navActive: true,
    screenWidth: 0,
  },
  reducers: {
    setNavActive: (state, action: PayloadAction<boolean>) => {
      state.navActive = action.payload;
    },
    setScreenWidth: (state, action: PayloadAction<number>) => {
      state.screenWidth = action.payload;
    },
  },
});

export default appSlice;
