import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { useDebounce } from "../../hooks/useDebounce";
import TrackSearchResult from "../../components/TrackSearchResult";
import Player from "../../components/Player";
import ArtistSearchResult from "../../components/ArtistSearchResult";

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    tracks: [],
    artists: [],
  });
  const [selectedSong, setSelectedSong] = useState();
  const [lyrics, setLyrics] = useState("");

  useDebounce(
    () => {
      if (!searchTerm) return setSearchResults({ tracks: [], artists: [] });
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
          console.log(res.data);
          const tracksMap = res.data.tracks.map((track) => {
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              image_uri: track.album.images.reduce((smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              }, track.album.images[0]),
            };
          });
          const artistsMap = res.data.artists.map((artist) => {
            return {
              name: artist.name,
              id: artist.id,
              image_uri: artist.images.reduce((smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              }, artist.images[0]),
            };
          });
          const fullMap = { tracks: tracksMap, artists: artistsMap };
          setSearchResults(fullMap);
        });
    },
    [searchTerm, accessToken],
    500
  );

  const chooseTrack = (track) => {
    setSelectedSong(track);
    setSearchResults({ tracks: [], artists: [] });
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
        {searchResults.tracks.length &&
          searchResults.tracks.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}
        {searchResults.artists.length &&
          searchResults.artists.map((artist) => (
            <ArtistSearchResult
              artist={artist}
              key={artist.id}
              chooseTrack={chooseTrack}
            />
          ))}
        {searchResults.tracks?.length === 0 && selectedSong && (
          <div className="text-center">
            {lyrics.split(/\r?\n/).map((line) => {
              return <p>{line}</p>;
            })}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={selectedSong?.uri} />
      </div>
    </Container>
  );
};

export default Dashboard;
