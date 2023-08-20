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

    const filmsData = unwrappedData.results;
    const filmsDataWithImages = filmsData.map((film) => {
      film.poster = this.#getFilmsPosters(film);
      film.genres = this.#handleFilmsGenres(film.genre_ids);
      return film;
    });

    return filmsDataWithImages;
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

  getFilmsData(callback) {
    this.#fetchFilmsData()
      .then((filmsData) => callback(filmsData))
      .catch((err) => alert(err));
  }
}

const defaultModule = new TMDBAPIManager();

export default defaultModule;
// export { defaultModule.getFilmsData}
