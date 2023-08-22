import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import UserLogin from "./components/Users/UserLogin";
import NavBar from "./components/NavBar";
import FilmsCardsList from "./components/FilmsCardsList/FilmsCardsList";
import FilmsDetails from "./components/FilmsDetails/FilmsDetails";
import FilmsCardsContainer from "./components/FilmsCardsList/FilmsCardsContainer";
import RentedFilmsCardsList from "./components/FilmsCardsList/RentedFilmsCardsList";
import SearchBar from "./components/SearchBar";
import UsersBalance from "./components/Users/UsersBalance";

function App() {
  const [filmsList, setFilmsList] = useState([]);
  const [rentedFilmsList, setRentedFilms] = useState({});
  const [currentUser, setCurrentUser] = useState(0);
  const [usersList, setUsersList] = useState([
    { name: "Milana", id: 4, balance: 20 },
    { name: "Nino", id: 3, balance: 20 },
    { name: "Michael", id: 2, balance: 20 },
    { name: "Rone", id: 1, balance: 20 },
  ]);

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
    const currUser = {
      ...usersList.find((user) => user.id === Number(userId)),
    };

    if (isFilmRented) {
      newRentedFilms = newRentedFilms.filter((film) => film.id !== filmId);

      currUser.balance += 5;
    } else {
      if (currUser.balance > 0) {
        newRentedFilms.push(currFilm);

        currUser.balance -= 5;
      } else {
        alert(
          "Your balance is 0. Add money to your account for rent new film."
        );
      }
    }

    setRentedFilms({ ...rentedFilmsList, [userId]: newRentedFilms });
    setUsersList([
      ...usersList.filter((user) => user.id !== Number(userId)),
      currUser,
    ]);
  }

  function userSelected(userId) {
    setCurrentUser(userId);
  }

  return (
    <Router>
      <NavBar userId={currentUser} />
      <Routes>
        <Route
          path="/"
          element=<UserLogin
            usersList={usersList}
            userSelected={userSelected}
          />
        />
        <Route
          path="user/:userId/films"
          element=<div>
            <UsersBalance usersList={usersList} />
            <SearchBar filmsListLoaded={filmsListLoaded} />
            <FilmsCardsContainer>
              <FilmsCardsList
                filmsListLoaded={filmsListLoaded}
                filmsList={filmsList}
                filmRented={filmRented}
                rentedFilmsList={rentedFilmsList}
              />
            </FilmsCardsContainer>
          </div>
        />
        <Route
          path="user/:userId/rented"
          element=<FilmsCardsContainer>
            <RentedFilmsCardsList
              filmRented={filmRented}
              rentedFilmsList={rentedFilmsList}
            />
          </FilmsCardsContainer>
        />
        <Route
          path="films/:filmId"
          element=<FilmsDetails filmsList={filmsList} />
        />
      </Routes>
    </Router>
  );
}

export default App;
