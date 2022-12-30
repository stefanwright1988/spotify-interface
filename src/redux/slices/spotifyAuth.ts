import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { spotifyApi } from "../api/spotify";

type TInitialState = {
  spotify_access_code: null | string;
  spotify_refresh_code: null | string;
  spotify_token_expiresAt: null | number;
};

const initialState: TInitialState = {
  spotify_access_code: null,
  spotify_refresh_code: null,
  spotify_token_expiresAt: 3600,
};

const spotifySlice = createSlice({
  name: "spotify",
  initialState,
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
      )
      .addMatcher(
        spotifyApi.endpoints.refreshToken.matchFulfilled,
        (state, action) => {
          state.spotify_access_code = action.payload.access_token;
        }
      )
      .addMatcher(
        spotifyApi.endpoints.getTopArtists.matchFulfilled,
        (state, action) => {
          spotifyApi.endpoints.recentGenrePlaylists.initiate(
            action.payload.genres
          );
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
