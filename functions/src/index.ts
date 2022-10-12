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

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      // eslint-disable-next-line prettier/prettier
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
        "utf-8"
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        res.send(response.data);
      } else {
        res.send(response);
      }
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});
exports.app = functions.https.onRequest(app);
