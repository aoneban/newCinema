export const API_KEY = '6f935771-6ea6-4fdd-b138-660013b47b14';
//export const API_KEY = '750447c2-3f08-4a4a-b7ea-2dc529472642';
//export const API_KEY = '8fb3f1d4-57ae-40d8-a0e9-7e563721a82c';
export const API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=';
export const API_FILM_MODAL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
export const API_FILM_ACTORS = 'https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=';
export const API_PERSONAL_ACTOR = 'https://kinopoiskapiunofficial.tech/api/v1/staff/';
export const API_GET_TRAILERS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
export const API_FILM_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
export const API_FILMS_PREMIER = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=";
export const API_AWAIT_MOVIE = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=';
export const API_TOP_250 ='https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=';
export const API_FILM_IMAGES = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
export const API_OPINIONS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';

export async function getMovie(url, id) {
  const response = await fetch(url + id, {
    method: 'GET',
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
  });
  const responseData = await response.json();
  return responseData;
}

export async function getMovieValue(url, id, keyword) {
  const response = await fetch(url + id + keyword, {
    method: 'GET',
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
  });
  const responseData = await response.json();
  return responseData;
}