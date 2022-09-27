import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import SpotifyWebApi = require("spotify-web-api-node");
import * as lyricsFinder from "lyrics-finder";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://127.0.0.1:5173",
    clientId: "8b82677d1fa148f4994da55224a4d540",
    clientSecret: "03809aa8f5a24d09befd136ba4be0ce3",
    refreshToken: refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log("The access token has been refreshed!");
      console.log(data.body);
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log("Could not refresh access token", err);
      res.status(400).send(err.message);
    });
});

app.post("/login", (req, res) => {
  const authResCode = req.body.code;
  console.log(`authResCode is: ${authResCode}`);

  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://127.0.0.1:5173",
    clientId: "8b82677d1fa148f4994da55224a4d540",
    clientSecret: "03809aa8f5a24d09befd136ba4be0ce3",
  });

  spotifyApi
    .authorizationCodeGrant(authResCode)
    .then((resData) => {
      res.json({
        accessToken: resData.body.access_token,
        refreshToken: resData.body.refresh_token,
        expiresIn: resData.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err.message);
    });
});

app.get("/search", (req: any, res) => {
  const accessToken = req.query.accessToken;
  const searchTerm = req.query.searchTerm;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://127.0.0.1:5173",
    clientId: "8b82677d1fa148f4994da55224a4d540",
    clientSecret: "03809aa8f5a24d09befd136ba4be0ce3",
  });
  console.log(`accessToken is: ${accessToken}`);
  spotifyApi.setAccessToken(accessToken);

  let retVal = { tracks: [], artists: [] };

  Promise.all([
    spotifyApi
      .searchTracks(searchTerm)
      .then((response) => (retVal.tracks = response.body.tracks.items))
      .catch((err) => {
        console.log(err);
      }),
    spotifyApi
      .searchArtists(searchTerm)
      .then((response) => (retVal.artists = response.body.artists.items))
      .catch((err) => {
        console.log(err);
      }),
  ]).then(() => res.status(200).send(retVal));
});

app.get("/lyricsLookup", async (req: any, res) => {
  const trackTitle = req.query.trackTitle;
  const trackArtist = req.query.trackArtist;

  const trackLyrics =
    (await lyricsFinder(trackArtist, trackTitle)) || "No Lyrics Found";
  console.log(trackLyrics);
  res.json({ trackLyrics });
});

app.get("/getPlaylists", (req: any, res) => {
  const accessToken = req.query.accessToken;
  console.log(`accessToken is: ${accessToken}`);

  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://127.0.0.1:5173",
    clientId: "8b82677d1fa148f4994da55224a4d540",
    clientSecret: "03809aa8f5a24d09befd136ba4be0ce3",
  });

  spotifyApi.setAccessToken(accessToken);

  spotifyApi.getUserPlaylists("1163907351").then((playlistData) => {
    res.status(200).send(playlistData);
  });
});

export const webApi = functions.https.onRequest(app);
