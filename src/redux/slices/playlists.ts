import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const fetchAllPlaylists = createAsyncThunk<any, any, { state: any }>(
  "fetch-all-playlists",
  async (args: any) => {
    const { apiUrl, opts } = args;
    const response: any = await fetch(apiUrl, opts);
    return response.data;
  }
);

const playlistsSlice = createSlice({
  name: "playlists",
  initialState: { data: [], fetchStatus: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPlaylists.fulfilled, (state, action) => {
        (state.data = action.payload), (state.fetchStatus = "fulfilled");
      })
      .addCase(fetchAllPlaylists.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchAllPlaylists.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export default playlistsSlice;
