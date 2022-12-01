import {
  combineReducers,
  configureStore,
  ConfigureStoreOptions,
} from "@reduxjs/toolkit";
import appSlice from "../slices/globalApp";
import playlistsSlice from "../slices/spotifyPlaylists";
import spotifySlice from "../slices/spotifyAuth";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "../api/api";

const spotifyPersistConfig = {
  key: "spotifyState",
  storage,
  whitelist: ["spotify_refresh_code"],
};

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  app: appSlice.reducer,
  playlists: playlistsSlice.reducer,
  spotify: persistReducer(spotifyPersistConfig, spotifySlice.reducer),
});

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
