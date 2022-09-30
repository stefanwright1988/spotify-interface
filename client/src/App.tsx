import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
} from "./pages";
import "./app.css";
import { Sidebar } from "./components";

function App() {
  const activeMenu = true;

  return (
    <main className="flex h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Default />}>
            <Route index element={<Dashboard />} />
            <Route path="search" element={<Search />} />
            <Route path="playlists" element={<Playlists />} />
            <Route path="playlist" element={<Playlist />} />
            <Route path="artists" element={<Artists />} />
            <Route path="artist" element={<Artist />} />
            <Route path="albums" element={<Albums />} />
            <Route path="album" element={<Album />} />
            <Route path="me" element={<Me />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
