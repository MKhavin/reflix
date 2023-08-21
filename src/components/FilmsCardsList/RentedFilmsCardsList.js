import FilmsCard from "./FilmsCard";
import { useParams } from "react-router-dom";

export default function RentedFilmsCardsList({ rentedFilmsList, filmRented }) {
  const { userId } = useParams();

  function rentFilmButtonClicked(filmId) {
    filmRented(filmId, userId);
  }

  return (
    <>
      {rentedFilmsList[userId]?.map((currFilm) => (
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
    </>
  );
}
