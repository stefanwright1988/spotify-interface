import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { spotifyApi } from "../api/spotify";

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
  extraReducers: (builder) => {
    builder
      .addMatcher(
        spotifyApi.endpoints.callback.matchPending,
        (state, action) => {
          console.log("pending", action);
        }
      )
      .addMatcher(
        spotifyApi.endpoints.callback.matchFulfilled,
        (state, action) => {
          state.spotify_access_code = action.payload.access_token;
          state.spotify_refresh_code = action.payload.refresh_token;
          window.history.pushState({}, "", "/");
        }
      )
      .addMatcher(
        spotifyApi.endpoints.callback.matchRejected,
        (state, action) => {
          console.log("rejected", action);
        }
      );
  },
});

export default spotifySlice;

export const {
  setSpotifyAccessCode,
  setSpotifyExpiresAt,
  setSpotifyRefreshCode,
} = spotifySlice.actions;
