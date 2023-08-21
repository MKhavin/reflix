import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import UserLogin from "./components/UserLogin";
import NavBar from "./components/NavBar";
import FilmsCardsList from "./components/FilmsCardsList";

function App() {
  const [filmsList, setFilmsList] = useState([]);
  const [rentedFilmsList, setRentedFilms] = useState({});
  const usersList = [
    { name: "Michael", id: 2 },
    { name: "Rone", id: 1 },
  ];

  function filmsListLoaded(filmsData) {
    setFilmsList(filmsData);
  }

  function filmRented(filmId, userId) {
    const currFilm = filmsList.find((film) => film.id === filmId);

    let newRentedFilms;
    if (rentedFilmsList[userId]) {
      newRentedFilms = [...rentedFilmsList[userId]];
    } else {
      newRentedFilms = [];
    }
    const isFilmRented = newRentedFilms.find((film) => film.id === filmId);

    if (isFilmRented) {
      newRentedFilms = newRentedFilms.filter((film) => film.id !== filmId);
    } else {
      newRentedFilms.push(currFilm);
    }

    setRentedFilms({ ...rentedFilmsList, [userId]: newRentedFilms });
  }

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element=<UserLogin usersList={usersList} /> />
        <Route
          path="user/:userId"
          element=<FilmsCardsList
            filmsListLoaded={filmsListLoaded}
            filmsList={filmsList}
            filmRented={filmRented}
            rentedFilmsList={rentedFilmsList}
          />
        />
      </Routes>
    </Router>
  );
}

export default App;
