const API_KEY = "34794ce3f355f2a8168e538558fc7106";
const BASE_PATH = "https://api.themoviedb.org/3";

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
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genre_ids: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    original_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
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
    `${BASE_PATH}/movie/${
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
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&page=${pageParam}`
  ).then((response) => response.json());
}

export function getNowPlayingMovies(pageParam: number | unknown = 1) {
  console.log("getMovies Now Playing ===============");
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&page=${pageParam}`
  ).then((response) => response.json());
}

export function getComingSoonMovies(pageParam: number | unknown = 1) {
  console.log("getMovies Upcoming ===============");
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&page=${pageParam}`
  ).then((response) => response.json());
}

export function getMovie(movieId: number) {
  console.log("getMovie ===============");
  return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
