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
import ProtectedRoutes from "./middleware/ProtectedRoutes";

function App() {
  //Redux
  const { spotify_access_code, spotify_refresh_code, spotify_token_expiresAt } =
    useAppSelector((state: any) => state.spotify);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/loginCallback" element={<LoginCallback />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route index element={<Dashboard />} />
          <Route path="search" element={<Search />} />
          <Route path="playlists" element={<Playlists />} />
          <Route path="playlist/:playlistId" element={<Playlist />} />
          <Route path="artists" element={<Artists />} />
          <Route path="artist" element={<Artist />} />
          <Route path="albums" element={<Albums />} />
          <Route path="album" element={<Album />} />
          <Route path="me" element={<Me />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
