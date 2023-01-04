import { useSelector } from "react-redux";
import { IAllPlaylists, IPlaylist } from "../../types/playlistTypes";
import { api } from "./api";

export const spotifyApi = api.injectEndpoints({
  endpoints: (build) => ({
    callback: build.query<
      { access_token: string; refresh_token: string; expires_in: number },
      any
    >({
      query: (bodyContent: any) => ({
        url: "callback",
        method: "POST",
        body: bodyContent,
      }),
    }),
    refreshToken: build.query<any, void | null>({
      query: () => ({
        url: "refresh_token",
      }),
    }),
    getUser: build.query<any, void | null>({
      query: () => ({
        url: "getUser",
      }),
      providesTags: (result, error, id) => ["User"],
    }),
    allPlaylists: build.query<IAllPlaylists, void | null>({
      query: () => ({
        url: "allPlaylists",
      }),
      providesTags: (result, error, id) => ["Playlists"],
    }),
    singlePlaylist: build.query<IPlaylist, any>({
      query: (playlistId) => ({
        url: "playlist",
        params: { playlistId: playlistId },
      }),
      providesTags: (result, error, id) => [{ type: "Playlist", id }],
    }),
    featuredPlaylists: build.query<any, void | null>({
      query: () => ({
        url: "featuredPlaylists",
      }),
    }),
    recentGenrePlaylists: build.query<any, void | undefined>({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        let argGenres = [...arg.genres];
        var seedGenres = {};

        for (var i = 0; i < 2; i++) {
          var idx = Math.floor(Math.random() * argGenres.length);
          const query = await baseQuery(
            `/search?query=${argGenres[idx]}&type=playlist&limit=10`
          );
          seedGenres[i] = {};
          seedGenres[i]["name"] = argGenres[idx];
          seedGenres[i] = { ...query.data, ...seedGenres[i] };
          argGenres.splice(idx, 1);
        }
        return { data: seedGenres };
      },
    }),
    getTopArtistsAndGenres: build.query<any, void | null>({
      query: () => ({
        url: "getTopArtistsAndGenres",
      }),
      transformResponse: (response) => {
        const artists = new Set();
        const genres = new Set();
        response.items.map((artist) => {
          artists.add({
            artistName: artist.name,
            artistId: artist.id,
            images: artist.images,
          });
          if (artist.genres.length > 0) {
            artist.genres.forEach((genre) => genres.add(genre));
          }
        });
        return {
          artists: Array.from(artists),
          genres: Array.from(genres),
        };
      },
    }),
    getRelatedArtists: build.query<any, void | null>({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        let argArtists = [...arg.artists];
        let retVal = { queryArtist: "", artists: [] };

        while (retVal["artists"].length === 0) {
          var idx = Math.floor(Math.random() * argArtists.length);
          const queryArtist = argArtists[idx];

          retVal["queryArtist"] = queryArtist.artistName;
          const query = await baseQuery(
            `/relatedArtists?artistId=${queryArtist.artistId}`
          );

          retVal["artists"].push(...query.data.artists);

          argArtists.splice(idx, 1);
        }
        return { data: retVal };
      },
    }),
    test: build.query({
      query: () => ({
        url: "hello",
      }),
    }),
  }),
});

export const {
  useCallbackQuery,
  useRefreshTokenQuery,
  useTestQuery,
  useAllPlaylistsQuery,
  useSinglePlaylistQuery,
  useGetUserQuery,
  useFeaturedPlaylistsQuery,
  useRecentGenrePlaylistsQuery,
  useGetTopArtistsAndGenresQuery,
  useGetRelatedArtistsQuery,
} = spotifyApi;

export const {
  endpoints: { callback },
} = spotifyApi;
