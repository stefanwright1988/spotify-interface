export interface PlaylistListAttributes {
  href: string;
  items: [{}];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}
export interface PlaylistAttributes {
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
  tracks: [
    {
      href: string;
      items: [{}];
      limit: number;
      next: string;
      offset: number;
      previous: string;
      total: number;
    }
  ];
  type: string;
  uri: string;
}
