import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Container, Nav } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import Playlists from "./pages/Playlists";
import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

const accessCode = new URLSearchParams(window.location.search).get("code");

function App() {
  const [playlists, setPlaylists] = useState([]);
  const accessToken = useAuth(accessCode);
  useEffect(() => {
    if (!accessToken) return;
    axios
      .get(
        "http://localhost:5001/spotify-react-ts-vite/us-central1/webApi/getPlaylists",
        {
          params: {
            accessToken,
          },
        }
      )
      .then((res) => {
        console.log(res);
        const playlistMap = res.data.body.items.map((playlist) => {
          return {
            name: playlist.name,
            id: playlist.id,
            image_uri: playlist.images.reduce((smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            }, playlist.images[0]),
          };
        });
        setPlaylists(playlistMap);
      })
      .catch((err) => {
        if (err.code !== "ERR_CANCELED") console.log(err);
      });
  }, [accessToken]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Login />} />
          <Route path="dashboard" element={<Dashboard code={accessToken} />}>
            <Route
              path="playlists"
              element={<Playlists playlists={playlists} />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
