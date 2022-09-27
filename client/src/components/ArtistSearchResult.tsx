import React from "react";

const ArtistSearchResult = ({ artist }) => {
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
    >
      <img
        src={artist.image_uri.url}
        style={{ height: "64px", width: "64px" }}
      />
      <div className="ml-3">
        <div>{artist.name}</div>
      </div>
    </div>
  );
};

export default ArtistSearchResult;
