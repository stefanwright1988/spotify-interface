import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const spotifySlice = createSlice({
  name: "spotify",
  initialState: {
    spotify_access_code: "",
    spotify_refresh_code: "",
    spotify_token_expiresAt: 3600,
  },
  reducers: {
    setSpotifyAccessCode: (state, action: PayloadAction<string>) => {
      state.spotify_access_code = action.payload;
    },
    setSpotifyRefreshCode: (state, action: PayloadAction<string>) => {
      state.spotify_refresh_code = action.payload;
    },
    setSpotifyExpiresAt: (state, action: PayloadAction<number>) => {
      state.spotify_token_expiresAt = action.payload;
    },
  },
});

export default spotifySlice;
