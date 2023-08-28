import {
  ADULT_FILMS,
  API_KEY,
  APP_LANG,
  POSTERS_WIDTH,
  WITH_TRAILERS,
} from "./Constants";

class TMDBAPIManager {
  #genres = [];

  async #fetchFilmsData() {
    if (!this.#genres.length) {
      this.#genres = await this.#getFilmsGenres();
    }

    const apiResponse = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=${ADULT_FILMS}&include_video=${WITH_TRAILERS}&language=${APP_LANG}&api_key=${API_KEY}`
    );
    const unwrappedData = await apiResponse.json();

    return this.#handleFilmsData(unwrappedData.results);
  }

  #getFilmsPosters(film) {
    const imageUrlTemplate = `https://image.tmdb.org/t/p/w${POSTERS_WIDTH}`;

    return imageUrlTemplate + film.poster_path;
  }

  async #getFilmsGenres() {
    const apiResponse = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=${APP_LANG}&api_key=${API_KEY}`
    );

    return (await apiResponse.json()).genres;
  }

  #handleFilmsGenres(genres_id) {
    const filmsGenres = genres_id.map(
      (id) => this.#genres.find((genre) => genre.id === id)?.name
    );

    return filmsGenres;
  }

  async #fetchFilmsDataByUsersQuery(query) {
    if (!this.#genres.length) {
      this.#genres = await this.#getFilmsGenres();
    }

    const apiURL = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=${ADULT_FILMS}&include_video=${WITH_TRAILERS}&language=${APP_LANG}&api_key=${API_KEY}`;
    const apiResponse = await fetch(apiURL);
    const unwrappedData = await apiResponse.json();

    return this.#handleFilmsData(unwrappedData.results);
  }

  #handleFilmsData(filmsData) {
    const filmsDataWithImages = filmsData.map((film) => {
      const newFilm = structuredClone(film);

      newFilm.poster = this.#getFilmsPosters(newFilm);

      if (newFilm.genre_ids) {
        newFilm.genres = this.#handleFilmsGenres(newFilm.genre_ids);
      } else if (newFilm.genres) {
        newFilm.genres = newFilm.genres.map((genre) => genre.name);
      }
      return newFilm;
    });

    return filmsDataWithImages;
  }

  async #fetchFilmDataById(filmId) {
    if (!this.#genres.length) {
      this.#genres = await this.#getFilmsGenres();
    }

    const apiURL = `https://api.themoviedb.org/3/movie/${filmId}?language=${APP_LANG}&api_key=${API_KEY}`;
    const apiResponse = await fetch(apiURL);
    const unwrappedData = await apiResponse.json();

    const filmData = this.#handleFilmsData([unwrappedData]);
    filmData[0].trailerURL = await this.#fetchFilmTrailer(filmData[0].id);

    return filmData;
  }

  async #fetchFilmTrailer(filmId) {
    if (!filmId) {
      return;
    }

    const apiURL = `https://api.themoviedb.org/3/movie/${filmId}/videos?language=${APP_LANG}&api_key=${API_KEY}`;
    const apiResponse = await fetch(apiURL);
    const unwrappedData = await apiResponse.json();

    const trailersVideos = unwrappedData.results.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    const trailerURL = `http://www.youtube.com/embed/${trailersVideos[0]?.key}`;

    return trailerURL;
  }

  getFilmsData(callback) {
    this.#fetchFilmsData()
      .then((filmsData) => callback(filmsData))
      .catch((err) => alert(err));
  }

  getFilmsDataByUsersQuery(query, callback) {
    this.#fetchFilmsDataByUsersQuery(query)
      .then((filmsData) => callback(filmsData))
      .catch((err) => alert(err));
  }

  getFilmDataById(filmId, callback) {
    this.#fetchFilmDataById(filmId)
      .then((filmsData) => callback(filmsData[0]))
      .catch((err) => alert(err));
  }

  getFilmTrailer(filmId, callback) {
    this.#fetchFilmTrailer(filmId).then((trailerURL) => callback(trailerURL));
  }
}

const defaultModule = new TMDBAPIManager();

export default defaultModule;
