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

app.get("/hello", (req, res) => {
  res.status(200).send({ response: "Hello world" });
});

app.get("/login", (req, res) => {
  console.log(req.headers);
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
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.post("/callback", (req: any, res) => {
  const code = req.body || null;
  let retVal = {};

  const options = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
        "utf-8"
      ).toString("base64")}`,
    },
  };

  console.log(`code is: ${code}`);
  const data = querystring.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  });
  axios
    .post("https://accounts.spotify.com/api/token", data, options)
    .then(async (tokenResponse) => {
      if (tokenResponse.status === 200) {
        retVal = { ...retVal, ...tokenResponse.data };
        await getUserDetails(tokenResponse.data.access_token).then((user) => {
          retVal = { ...retVal, ...user };
        });
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
        retVal = { error: error.request, status: error.response.status };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        retVal = { error: error.message, status: error.response.status };
      }
    })
    .finally(() => {
      res.send(retVal);
    });
});

app.get("/refresh_token", (req: any, res: any) => {
  const refreshToken = req.headers["rtkrefreshtoken"];

  if (!refreshToken) {
    return res.status(200).send("no token");
  } else {
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
      .then(async (response) => {
        await getUserDetails(response.data.access_token);
        return res.send(response.data);
      })
      .catch((error) => {
        return res.send(error);
        console.log(error);
      });
  }
});

app.get("/allPlaylists", async (req: any, res) => {
  const accessToken = req.headers["rtkaccesstoken"];
  console.log(req.headers);
  try {
    const playlists = await getAllPlaylists(accessToken);
    res.send(playlists);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

const getPlaylistsByBatch = async (accessToken, batch, limit) => {
  return axios.get(
    `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${
      batch * limit
    }`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const getAllPlaylists = async (accessToken) => {
  let retVal: any = {};
  const retPromises = [];
  let retPlaylists = [];
  const listqueryLimit = 50;

  const getPlaylist = await axios.get(
    `https://api.spotify.com/v1/me/playlists`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const { data } = getPlaylist;
  retVal = { ...data };

  const trackCount = data.total;
  const batchCount = Math.ceil(trackCount / listqueryLimit);
  for (let batchNumber = 0; batchNumber < batchCount; batchNumber++) {
    const fetchPlaylists = getPlaylistsByBatch(
      accessToken,
      batchNumber,
      listqueryLimit
    );
    retPromises.push(fetchPlaylists);
  }
  const rawPlaylists: any = await Promise.all(retPromises);
  for (let i = 0; i < rawPlaylists.length; i++) {
    retPlaylists = retPlaylists.concat(rawPlaylists[i].data.items);
  }
  retVal.items = retPlaylists;
  return retVal;
};

app.get("/playlist", async (req: any, res) => {
  const { accessToken, playlistId } = req.query;
  try {
    const songs = await getAllPlaylistSongs(accessToken, playlistId);
    res.send(songs);
  } catch (e) {
    console.log(e);
    res.sendStatus(e.response.status);
  }
});

const getSongsByBatch = async (playlistId, accessToken, batch, limit) => {
  return axios.get(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}&offset=${
      batch * limit
    }`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const getAllPlaylistSongs = async (accessToken, playlistId) => {
  let retVal: any = {};
  const retPromises = [];
  let retSongs = [];
  const listqueryLimit = 50;

  const getPlaylist = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const { data } = getPlaylist;
  retVal = { ...data };

  const trackCount = data.tracks.total;
  const batchCount = Math.ceil(trackCount / listqueryLimit);
  for (let batchNumber = 0; batchNumber < batchCount; batchNumber++) {
    const fetchSongs = getSongsByBatch(
      playlistId,
      accessToken,
      batchNumber,
      listqueryLimit
    );
    retPromises.push(fetchSongs);
  }
  const rawSongs: any = await Promise.all(retPromises);
  for (let i = 0; i < rawSongs.length; i++) {
    retSongs = retSongs.concat(rawSongs[i].data.items);
  }
  retVal.tracks.items = retSongs;
  return retVal;
};

app.get("/getUser", async (req: any, res: any) => {
  const accessToken = req.headers["rtkaccesstoken"];
  if (!accessToken) {
    return res
      .status(401)
      .send({ message: "No Access Header Value", status: 401 });
  }
  const user = await getUserDetails(accessToken);
  return res.send(user);
});

const getUserDetails = async (accessToken): Promise<any> => {
  let retVal = {};
  await axios
    .get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      retVal = { ...retVal, ...response.data };
    })
    .catch((error) => {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        retVal = {
          ...error.response.data,
          status: error.response.status,
        };
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        retVal = { error: error.request };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        retVal = { error: error.message };
      }
    });
  return retVal;
};

exports.app = functions.https.onRequest(app);
