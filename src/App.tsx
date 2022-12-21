import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Dashboard,
  Albums,
  Album,
  Artist,
  Artists,
  Playlist,
  Playlists,
  Search,
  Me,
  Default,
  Login,
} from "./pages";
import "./app.css";
import LoginCallback from "./session/LoginCallback";
import { useAppSelector } from "./hooks/reduxHooks";
import UserMiddleware from "./middleware/UserMiddleware";

function App() {
  //Redux
  const { spotify_access_code, spotify_refresh_code, spotify_token_expiresAt } =
    useAppSelector((state: any) => state.spotify);

  if (!spotify_access_code || spotify_access_code === "") {
    return (
      <BrowserRouter>
        <UserMiddleware>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/loginCallback" element={<LoginCallback />} />
          </Routes>
        </UserMiddleware>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <UserMiddleware>
        <Routes>
          <Route path="/" element={<Default />}>
            <Route index element={<Dashboard />} />
            <Route path="search" element={<Search />} />
            <Route path="playlists" element={<Playlists />} />
            <Route path="playlist/:playlistId" element={<Playlist />} />
            <Route path="artists" element={<Artists />} />
            <Route path="artist" element={<Artist />} />
            <Route path="albums" element={<Albums />} />
            <Route path="album" element={<Album />} />
            <Route path="me" element={<Me />} />
            <Route path="loginCallback" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
      </UserMiddleware>
    </BrowserRouter>
  );
}

export default App;
