import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import axios from "axios";
import * as querystring from "querystring";
import * as admin from "firebase-admin";

admin.initializeApp();
const app = express();
app.use(cors());

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_state_key";

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = process.env.SPOTIFY_AUTH_SCOPES;

  const queryParams = querystring.stringify({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    state: state,
    scope: scope,
  });
  console.log("go for redirect?");
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get("/callback", (req: any, res) => {
  const code = req.query.code || null;
  let retVal = {};

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      "utf-8"
    ).toString("base64")}`,
  };
  const data = querystring.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  });
  axios
    .post("https://accounts.spotify.com/api/token", data, { headers })
    .then((tokenResponse) => {
      if (tokenResponse.status === 200) {
        retVal = { ...retVal, ...tokenResponse.data };
      } else {
        retVal = { ...retVal, ...tokenResponse };
      }
    })
    .catch((error) => {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        retVal = { ...error.response.data, status: error.response.status };
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        retVal = { error: error.request };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        retVal = { error: error.message };
      }
    })
    .finally(() => {
      res.send(retVal);
    });
});

app.get("/refresh_token", (req: any, res) => {
  const { refreshToken } = req.query;

  axios
    .post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
            "utf-8"
          ).toString("base64")}`,
        },
      }
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
      console.log(error);
    });
});

app.get("/playlists", (req: any, res) => {
  const { accessToken } = req.query;

  axios
    .get("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

exports.app = functions.https.onRequest(app);
