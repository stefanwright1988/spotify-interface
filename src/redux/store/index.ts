import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from "../slices/globalApp";
import playlistsSlice from "../slices/spotifyPlaylists";
import spotifySlice from "../slices/spotifyAuth";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

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
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
