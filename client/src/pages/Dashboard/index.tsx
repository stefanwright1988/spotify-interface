import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Container, Form } from "react-bootstrap";
import axios from "axios";
import { useDebounce } from "../../hooks/useDebounce";
import TrackSearchResult from "../../components/TrackSearchResult";
import Player from "../../components/Player";
import ArtistSearchResult from "../../components/ArtistSearchResult";
import Playlists from "../../components/Playlists";
import Nav from "../../components/Nav";

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    tracks: [],
    artists: [],
  });
  const [selectedSong, setSelectedSong] = useState();
  const [lyrics, setLyrics] = useState("");
  const [playlists, setPlaylists] = useState([]);

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
    <>
      <Nav>
        <Form.Control
          type="search"
          placeholder="Search Songs/Artist"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </Nav>
      <div className="row flex-grow-1">
        <Playlists playlists={playlists} />
        <Container className="row col-11 d-flex flex-column py-2">
          <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
            {searchResults.tracks.length > 0 &&
              searchResults.tracks.map((track) => (
                <TrackSearchResult
                  track={track}
                  key={track.uri}
                  chooseTrack={chooseTrack}
                />
              ))}
            {searchResults.artists.length > 0 &&
              searchResults.artists.map((artist) => (
                <ArtistSearchResult artist={artist} key={artist.id} />
              ))}
            {searchResults.tracks?.length === 0 && selectedSong && (
              <div className="text-center">
                {lyrics.split(/\r?\n/).map((line, index) => {
                  return <p key={`line-${index}`}>{line}</p>;
                })}
              </div>
            )}
          </div>
        </Container>
      </div>
      <div className="row">
        <Player accessToken={accessToken} trackUri={selectedSong?.uri} />
      </div>
    </>
  );
};

export default Dashboard;
