import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { useDebounce } from "../../hooks/useDebounce";
import TrackSearchResult from "../../components/TrackSearchResult";
import Player from "../../components/Player";

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState();
  const [lyrics, setLyrics] = useState("");

  useDebounce(
    () => {
      if (!searchTerm) return setSearchResults([]);
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
          setSearchResults(map);
        });
    },
    [searchTerm, accessToken],
    500
  );

  const chooseTrack = (track) => {
    setSelectedSong(track);
    setSearchResults([]);
    setSearchTerm("");
    setLyrics("");
  };

  useEffect(() => {
    if (!selectedSong) return;
    axios
      .get(
        "http://localhost:5001/spotify-react-ts-vite/us-central1/webApi/lyricsLookup",
        {
          params: {
            trackTitle: selectedSong.title,
            trackArtist: selectedSong.artist,
          },
        }
      )
      .then((res) => {
        setLyrics(res.data.trackLyrics);
      });
  }, [selectedSong]);

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
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && selectedSong && (
          <div className="text-center">{lyrics}</div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={selectedSong?.uri} />
      </div>
    </Container>
  );
};

export default Dashboard;
