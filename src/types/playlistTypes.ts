/*
TODO: IAllPlaylists could become a comment typing for a Spotify Paginated Response as it;s commonly used throughout the API responses. they will need joining on other types so that the "items" are typed
*/

export interface IAllPlaylists {
  href: string;
  items: [IPlaylist];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}
export interface IPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: [{ url: string; height: string; width: string }];
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: 0;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: IPlaylistTracks;
  type: string;
  uri: string;
}

export interface IPlaylistTracks {
  href: string;
  items: [ITrackList];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface ITrackList {
  added_at: string;
  added_by: {
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  primary_color: string | null;
  track: ITrack;
  video_thumbnail: {
    url: string;
  };
}

export interface ITrack {
  album: IAlbum;
  artists: [IArtists];
  available_markets: [string];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track: boolean;
  track_number: number;
  type: string;
  uri: string;
}

export interface IAlbum {
  album_type: string;
  artists: [IArtists];
  available_markets: [string];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [IAlbumImages];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface IArtists {
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface IAlbumImages {
  height: Number;
  url: string;
  width: Number;
}
