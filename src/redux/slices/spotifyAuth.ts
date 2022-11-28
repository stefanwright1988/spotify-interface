import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { authApi } from "../api/auth";

const spotifySlice = createSlice({
  name: "spotify",
  initialState: {
    spotify_access_code: "",
    spotify_access_token: "",
    spotify_refresh_code: "",
    spotify_token_expiresAt: 3600,
  },
  reducers: {
    setSpotifyAccessToken: (state, action: PayloadAction<string>) => {
      state.spotify_access_token = action.payload;
    },
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
      .addMatcher(authApi.endpoints.callback.matchPending, (state, action) => {
        console.log("pending", action);
      })
      .addMatcher(
        authApi.endpoints.callback.matchFulfilled,
        (state, action) => {
          console.log("fulfilled", action);
          state.spotify_access_token = action.payload.token;
        }
      )
      .addMatcher(authApi.endpoints.callback.matchRejected, (state, action) => {
        console.log("rejected", action);
      });
  },
});

export default spotifySlice;
