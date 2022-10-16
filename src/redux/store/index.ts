import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from "../slices/app";
import playlistsSlice from "../slices/playlists";
import spotifySlice from "../slices/spotify";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const spotifyPersistConfig = {
  key: "spotifyState",
  storage,
  whitelist: ["spotify_refresh_code"],
};

const reducers = combineReducers({
  app: appSlice.reducer,
  playlists: playlistsSlice.reducer,
  spotify: persistReducer(spotifyPersistConfig, spotifySlice.reducer),
});

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
