import React from "react";
import { Container } from "react-bootstrap";

const AUTH_SCOPES = [
  "streaming",
  "user-read-email",
  "user-library-read",
  "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-private",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
];
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=8b82677d1fa148f4994da55224a4d540&response_type=code&redirect_uri=http://127.0.0.1:5173/dashboard&scope=${AUTH_SCOPES.join(
  "%20"
)}`;
const Login = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login with Spotify
      </a>
    </Container>
  );
};

export default Login;
