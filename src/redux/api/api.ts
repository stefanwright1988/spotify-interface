import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import appSlice from "../slices/globalApp";
import spotifySlice from "../slices/spotifyAuth";
import { RootState } from "../store";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5001/spotify-react-ts-vite/us-central1/app/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).spotify.spotify_refresh_code;
    if (token) {
      headers.set("rtkAuthToken", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);
  if (result?.error?.originalStatus === 200) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh_token", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      spotifySlice.actions.setSpotifyAccessCode(
        refreshResult.data.access_token
      );
      spotifySlice.actions.setSpotifyRefreshCode(
        refreshResult.data.refresh_token
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      //api.dispatch(logOut());
    }
  }

  return result;
};

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  reducerPath: "api",
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  baseQuery: baseQueryWithReauth,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  //tagTypes: ["Time", "Posts", "Counter"],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({
    getPost: () => "test",
  }),
});
