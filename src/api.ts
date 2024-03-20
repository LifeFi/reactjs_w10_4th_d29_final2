const API_KEY = "34794ce3f355f2a8168e538558fc7106";
const BASE_PATH = "https://api.themoviedb.org/3/movie";

// const BASE_PATH = "https://movies-api.nomadcoders.workers.dev";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  adult: boolean;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
}

export interface IGetMoviesResult {
  // dates: {
  //   maximum: string;
  //   minimum: string;
  // };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovieDetail extends IMovie {
  belongs_to_collection: BelongsToCollection;
  budget: number;
  homepage: string;
  genres: Genre[];
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
}

interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IAPIResponse {
  page: number;
  results: IMovie[];
}

export function getMovies(
  pathType: "" | "/now-playing" | "/coming-soon",
  pageParam: number | unknown = 1
) {
  console.log(
    `getMovies ${
      pathType === ""
        ? "popular"
        : pathType === "/now-playing"
        ? "now_playing"
        : "upcoming"
    } ===============`
  );

  return fetch(
    `${BASE_PATH}/${
      pathType === ""
        ? "popular"
        : pathType === "/now-playing"
        ? "now_playing"
        : "upcoming"
    }?api_key=${API_KEY}&page=${pageParam}`
  ).then((response) => response.json());
}

export function getPopularMovies(pageParam: number | unknown = 1) {
  console.log("getMovies Popular ===============");
  return fetch(
    `${BASE_PATH}/popular?api_key=${API_KEY}&page=${pageParam}`
  ).then((response) => response.json());
}

export function getNowPlayingMovies(pageParam: number | unknown = 1) {
  console.log("getMovies Now Playing ===============");
  return fetch(
    `${BASE_PATH}/now_playing?api_key=${API_KEY}&page=${pageParam}`
  ).then((response) => response.json());
}

export function getComingSoonMovies(pageParam: number | unknown = 1) {
  console.log("getMovies Upcoming ===============");
  return fetch(
    `${BASE_PATH}/upcoming?api_key=${API_KEY}&page=${pageParam}`
  ).then((response) => response.json());
}

export function getMovie(movieId: number) {
  console.log("getMovie ===============");
  return fetch(`${BASE_PATH}/${movieId}?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}
