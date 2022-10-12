import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    navActive: true,
    screenWidth: 0,
    spotify_access_code: "",
    spotify_refresh_code: "",
    spotify_token_expiresIn: 3600,
  },
  reducers: {
    setNavActive: (state, action: PayloadAction<boolean>) => {
      state.navActive = action.payload;
    },
    setScreenWidth: (state, action: PayloadAction<number>) => {
      state.screenWidth = action.payload;
    },
    setSpotifyAccessCode: (state, action: PayloadAction<string>) => {
      state.spotify_access_code = action.payload;
    },
    setSpotifyRefreshCode: (state, action: PayloadAction<string>) => {
      state.spotify_refresh_code = action.payload;
    },
    setSpotifyExpiresIn: (state, action: PayloadAction<number>) => {
      state.spotify_token_expiresIn = action.payload;
    },
  },
});

export default appSlice;
