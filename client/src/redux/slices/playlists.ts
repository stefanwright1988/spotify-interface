import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllPlaylists = createAsyncThunk(
  "fetch-all-playlists",
  async (apiUrl: string) => {
    const response = await fetch(apiUrl);
    return response.json();
  }
);

const playlistsSlice = createSlice({
  name: "playlists",
  initialState: { data: [], fetchStatus: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPlaylists.fulfilled, (state, action) => {
        (state.data = action.payload), (state.fetchStatus = "success");
      })
      .addCase(fetchAllPlaylists.pending, (state) => {
        state.fetchStatus = "pending";
      })
      .addCase(fetchAllPlaylists.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export default playlistsSlice;
