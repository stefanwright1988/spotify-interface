import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { useDebounce } from "../hooks/useDebounce";

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [searchTerm, setSearchTerm] = useState();
  const [searchResults, setSearchResults] = useState();

  useDebounce(
    () => {
      if (!searchTerm) return setSearchResults("");
      if (!accessToken) return;
      axios
        .get(
          "http://localhost:5001/spotify-react-ts-vite/us-central1/webApi/search",
          {
            params: {
              accessToken,
              searchTerm,
            },
          }
        )
        .then((res) => {
          const map = res.data.body.tracks.items.map((track) => {
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              album_uri: track.album.images.reduce((smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              }, track.album.images[0]),
            };
          });
          console.log(map);
        });
    },
    [searchTerm, accessToken],
    500
  );

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artist"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map((track) =>{
        <TrackSearchResult track={track} key={track.uri}})}
      </div>
      <div>Bottom</div>
    </Container>
  );
};

export default Dashboard;
