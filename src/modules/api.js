export const API_KEY = '750447c2-3f08-4a4a-b7ea-2dc529472642';
export const API_URL =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=';
export const API_FILM_MODAL =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
export const API_FILM_ACTORS =
  'https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=';
export const API_PERSONAL_ACTOR = 'https://kinopoiskapiunofficial.tech/api/v1/staff/';
export const API_GET_TRAILERS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
export const API_FILM_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
export const API_FILMS_PREMIER = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month="

export async function getMovie(url, id) {
  const response = await fetch(url + id, {
    method: 'GET',
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
  });
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}

export async function getMovieTrailers(url, id, keyword) {
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