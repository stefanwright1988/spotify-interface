import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import SpotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
      res.status(400).send(err.message);
    });
});

export const webApi = functions.https.onRequest(app);
