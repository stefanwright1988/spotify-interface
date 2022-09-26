import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import SpotifyWebApi = require("spotify-web-api-node");

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
      // Save the access token so that it's used in future calls
      //spotifyApi.setAccessToken(data.body["access_token"]);
    })
    .catch((err) => {
      console.log("Could not refresh access token", err);

      res.status(400).send(err.message);
    });
});

app.post("/login", (req, res) => {
  const authResCode = req.body.code;

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
  console.log(req);
  const accessToken = req.query.accessToken;
  const searchTerm = req.query.searchTerm;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://127.0.0.1:5173",
    clientId: "8b82677d1fa148f4994da55224a4d540",
    clientSecret: "03809aa8f5a24d09befd136ba4be0ce3",
  });
  console.log(`accessToken is: ${accessToken}`);
  spotifyApi.setAccessToken(accessToken);

  spotifyApi
    .searchTracks(searchTerm)
    .then((response) => res.status(200).send(response))
    .catch((err) => {
      console.log(err);
    });
});

export const webApi = functions.https.onRequest(app);
