// import React, { useState } from "react";
import "./css/FilmsCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import AppLink from "./util/AppLink";

export default function FilmsCard({ filmsData, isRented, filmRented }) {
  function rentButtonClicked() {
    filmRented(filmsData.id);
  }

  return (
    <div className="films-card">
      <AppLink to={`/films/${filmsData.id}`}>
        <img src={filmsData.poster} alt="film-card-img" />
        <h3>{filmsData.title}</h3>
      </AppLink>
      <button
        className={`favourite-button ${isRented && "is-favourite"}`}
        onClick={rentButtonClicked}
      >
        <FontAwesomeIcon icon={faStar} size="lg" />
      </button>
    </div>
  );
}
