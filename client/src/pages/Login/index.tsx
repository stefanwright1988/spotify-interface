import React from "react";
import { Container } from "react-bootstrap";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=8b82677d1fa148f4994da55224a4d540&response_type=code&redirect_uri=http://127.0.0.1:5173&scope=streaming%20user-read-email%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-private";
const Login = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login with Spotify
      </a>
    </Container>
  );
};

export default Login;
