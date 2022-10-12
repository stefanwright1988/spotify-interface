import * as functions from "firebase-functions";
import axios, { AxiosRequestConfig } from "axios";
import * as querystring from "querystring";
import * as cors from "cors";

import { db, auth } from "../../Firebase";

const loginWithCodeInner = async (data: any) => {
  console.log("welcome to loginWithCode");
  // Check for error or code
  const { code, devMode } = data;

  const redirectUri = devMode
    ? process.env.DEV_SPOTIFY_REDIRECT_URL
    : process.env.SPOTIFY_REDIRECT_URL;
  console.log("lets call a try block");
  try {
    // Retrieve access and refresh tokens
    const urlEncodedData = {
      code: code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    };
    const tokenExchangePayload: AxiosRequestConfig = {
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      data: querystring.stringify(urlEncodedData),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer(
            process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
          ).toString("base64"),
      },
    };

    const tokenExchangeResult = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify(urlEncodedData),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            new Buffer(
              process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
            ).toString("base64"),
        },
      }
    );
    axios.request(tokenExchangePayload);
    const { accessToken, refreshToken, expiresIn } = tokenExchangeResult.data;

    // Retrieve Spotify profile
    const retrieveIdPayload: AxiosRequestConfig = {
      method: "GET",
      url: "https://api.spotify.com/v1/me",
      headers: { Authorization: "Bearer " + accessToken },
    };
    const retrieveIdResult = (await axios.request(retrieveIdPayload)).data;
    const { displayName, email, externalUrls, id, images } = retrieveIdResult;

    // Locate existing user profile in Firestore
    const existingUserQuery = await db
      .collection("users")
      .where("id", "==", id)
      .get();
    let uid = "";
    if (existingUserQuery.docs.length === 1) {
      uid = existingUserQuery.docs[0].data().uid;
    } else if (existingUserQuery.docs.length === 0) {
      // User is authenticating for the first time
      // Create new user in Firebase
      const newUser = await auth.createUser({
        email,
        displayName: displayName,
      });
      uid = newUser.uid;
    }

    // Update user profile
    const newProfileData = {
      uid,
      id,
      name: displayName,
      urls: externalUrls,
      images,
    };
    await db.collection("users").doc(uid).set(newProfileData);

    // Save access tokens
    const userApiData = {
      uid,
      name: displayName,
      urls: externalUrls,
      ...retrieveIdResult,
      accessToken: accessToken,
      refreshToken: refreshToken,
      tokenExpiryMs: Date.now() + expiresIn * 1000 - 10000,
    };
    await db
      .collection("users")
      .doc(uid)
      .collection("sensitive")
      .doc("api")
      .set(userApiData);

    // Generate a login token
    const customToken = await auth.createCustomToken(uid);
    return { success: true, customToken };
  } catch (error: any) {
    console.error("Login error!");
    console.log(error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
    return { success: false };
  }
};

const loginWithCode = functions.https.onRequest(async (data, res) => {
  const corsFn = cors();
  corsFn(data, res, function () {
    loginWithCodeInner(data);
  });
});

export { loginWithCode };
