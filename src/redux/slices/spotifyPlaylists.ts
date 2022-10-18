import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  PlaylistAttributes,
  PlaylistListAttributes,
} from "../../types/playlistTypes";
import { RootState } from "../store";

export const fetchAllPlaylists = createAsyncThunk<
  PlaylistListAttributes,
  { apiUrl: string; opts: {} },
  { state: RootState }
>("fetch-all-playlists", async (args: { apiUrl: string; opts: {} }) => {
  const { apiUrl, opts } = args;
  const response: any = await fetch(apiUrl, opts);
  return (await response.json()) as PlaylistListAttributes;
});

export const fetchPlaylist = createAsyncThunk<
  PlaylistAttributes,
  { apiUrl: string; opts: {} },
  { state: RootState }
>("fetch-playlist", async (args: { apiUrl: string; opts: {} }) => {
  const { apiUrl, opts } = args;
  const response: any = await fetch(apiUrl, opts);
  return (await response.json()) as PlaylistAttributes;
});

const playlistsSlice = createSlice({
  name: "playlists",
  initialState: {
    playlists: {},
    playlistsFetchState: "idle",
    selectedPlaylist: {},
    selectedPlaylistFetchState: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPlaylists.fulfilled, (state, { payload }) => {
        (state.playlists = payload), (state.playlistsFetchState = "fulfilled");
      })
      .addCase(fetchAllPlaylists.pending, (state, action) => {
        state.playlistsFetchState = "loading";
      })
      .addCase(fetchAllPlaylists.rejected, (state, { error }) => {
        if (error.name !== "AbortError") {
          state.playlistsFetchState = "error";
        }
      })
      .addCase(fetchPlaylist.fulfilled, (state, { payload }) => {
        (state.selectedPlaylist = payload),
          (state.selectedPlaylistFetchState = "fulfilled");
      })
      .addCase(fetchPlaylist.pending, (state, action) => {
        state.selectedPlaylistFetchState = "loading";
      })
      .addCase(fetchPlaylist.rejected, (state, { error }) => {
        if (error.name !== "AbortError") {
          state.selectedPlaylistFetchState = "error";
        }
      });
  },
});

export default playlistsSlice;
