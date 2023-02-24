export const API_KEY = '750447c2-3f08-4a4a-b7ea-2dc529472642';
export const API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';

export async function getMovie(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
  });
  const responseData = await response.json();
  console.log(responseData);
  return responseData
}

export const createTitle = async (data) => {
  const value = await getMovie(data);
  const root = document.getElementById('root');
  const h1 = document.createElement('h1');
  h1.textContent = value.films.map(element => {
    return element.nameRu
  });;
  root.append(h1)
}
