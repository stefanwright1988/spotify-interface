import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../slices/app";
import playlistsSlice from "../slices/playlists";

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    playlists: playlistsSlice.reducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
