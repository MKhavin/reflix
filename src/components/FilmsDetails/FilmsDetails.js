import React, { useEffect, useState } from "react";
import FilmsGenresList from "./FilmsGenresList";
import apiManager from "../util/TMDBAPIManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import "../css/FilmsDetails.css";
import { faImdb } from "@fortawesome/free-brands-svg-icons";

export default function FilmsDetails({ filmsList }) {
  const filmId = Number(useParams().filmId);
  const [currFilm, setCurrFilm] = useState(null);

  useEffect(() => {
    if (currFilm) return;

    const newCurrFilm = filmsList.find((film) => film.id === filmId);

    if (newCurrFilm) {
      setCurrFilm(newCurrFilm);
    } else {
      apiManager.getFilmDataById(filmId, setCurrFilm);
    }
  }, [currFilm]);

  return (
    <div className="films-details">
      <img src={currFilm?.poster} alt="film-poster" />
      <h2>{currFilm?.title}</h2>
      <h3>{`(Original title: ${currFilm?.original_title})`}</h3>
      <FilmsGenresList genres={currFilm?.genres} />
      <p className="overview-title">
        <strong>Overview:</strong>
      </p>
      <p className="overview">{currFilm?.overview}</p>
      <p className="release-date-title">
        <strong>Release date:</strong>
      </p>
      <p className="release-date">{currFilm?.release_date}</p>
      <div className="imdb-title">
        <FontAwesomeIcon icon={faImdb} size="xl" />:
      </div>
      <p className="imdb">{currFilm?.vote_average}</p>
    </div>
  );
}
