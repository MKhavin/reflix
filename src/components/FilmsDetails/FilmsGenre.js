import React from "react";
import "../css/FilmsGenre.css";

export default function FilmsGenre({ genre }) {
  return (
    <div className="film-genre">
      <p>{genre}</p>
    </div>
  );
}
