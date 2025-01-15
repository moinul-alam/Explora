import React from "react";

const Trailer = ({ trailerId }) => (
  <div style={{ padding: "20px" }}>
    <h2>Trailer</h2>
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${trailerId}`}
      frameBorder="0"
      allowFullScreen
      title="Trailer"
    />
  </div>
);

export default Trailer;
