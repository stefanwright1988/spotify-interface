import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PlaylistListAttributes } from "../../types/playlistTypes";
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

const playlistsSlice = createSlice({
  name: "playlists",
  initialState: { data: {}, fetchState: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPlaylists.fulfilled, (state, { payload }) => {
        (state.data = payload), (state.fetchState = "fulfilled");
      })
      .addCase(fetchAllPlaylists.pending, (state, action) => {
        state.fetchState = "loading";
      })
      .addCase(fetchAllPlaylists.rejected, (state, { error }) => {
        if (error.name !== "AbortError") {
          state.fetchState = "error";
        }
      });
  },
});

export default playlistsSlice;
