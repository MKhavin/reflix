import React from "react";
import FilmsGenre from "./FilmsGenre";
import "../css/FilmsGenresList.css";

export default function FilmsGenresList({ genres }) {
  return (
    <div className="films-genres-list">
      {genres?.map((genre) => (
        <FilmsGenre genre={genre} key={crypto.randomUUID()} />
      ))}
    </div>
  );
}
