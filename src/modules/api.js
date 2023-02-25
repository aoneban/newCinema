export const API_KEY = '8fb3f1d4-57ae-40d8-a0e9-7e563721a82c';
export const API_URL =
  'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=';

export async function getMovie(url, page) {
  const response = await fetch(url + page, {
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


