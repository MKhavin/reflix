import React, { useEffect } from "react";
import "./css/FilmsCardsList.css";
import apiManager from "./util/TMDBAPIManager";
import FilmsCard from "./FilmsCard";
import { useParams } from "react-router-dom";

export default function FilmsCardsList({
  filmsList,
  filmsListLoaded,
  rentedFilmsList,
  filmRented,
}) {
  const { userId } = useParams();

  useEffect(() => apiManager.getFilmsData(filmsListLoaded), []);

  function rentFilmButtonClicked(filmId) {
    filmRented(filmId, userId);
  }

  return (
    <div className="films-cards-list">
      {filmsList.map((currFilm) => (
        <FilmsCard
          filmsData={currFilm}
          isRented={
            rentedFilmsList[userId]?.find((film) => film.id === currFilm.id) !==
            undefined
          }
          filmRented={rentFilmButtonClicked}
          key={crypto.randomUUID()}
        />
      ))}
    </div>
  );
}
