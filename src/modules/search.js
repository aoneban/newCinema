import { API_FILM_SEARCH, API_FILM_MODAL, getMovie } from './api';
import { renderModalWindowMovie } from './modal';
import { correctRatingPercent, colorRatingBorder } from './helpers';

export async function getSearchMovie() {
  const input = document.querySelector('.input-items').value;
  if (input.length < 2) {
    alert('Minimum 2 letters');
  } else {
    const data = await getMovie(API_FILM_SEARCH, input);
    document.querySelector('.content-wrapper').remove();
    const root = document.getElementById('root');
    const contentWrap = document.createElement('main');
    contentWrap.classList.add('content-wrapper');

    data.films.forEach(async (elem) => {
            const listMovies = document.createElement('div');
            listMovies.classList.add('list-movies');
            listMovies.addEventListener('click', async () => {
              const data = await getMovie(API_FILM_MODAL, elem.filmId);
              renderModalWindowMovie(data);
            });
      
            const movieCart = document.createElement('div');
            movieCart.classList.add('movie__cart');
      
            const movieCover = document.createElement('div');
            movieCover.classList.add('movie__cover-inner');
      
            const img = document.createElement('img');
            img.classList.add('poster-img');
            img.src = elem.posterUrlPreview;
            img.alt = elem.nameRu;
      
            movieCover.append(img);
      
            const movieInfo = document.createElement('div');
            movieInfo.classList.add('movie__info');
      
            const movieTitle = document.createElement('div');
            movieTitle.classList.add('movie__title');
            movieTitle.textContent = elem.nameRu;
      
            const movieCategory = document.createElement('div');
            movieCategory.classList.add('movie__category');
            movieCategory.textContent = elem.genres.map((el) => '\n' + el.genre);
      
            const productionYear = document.createElement('div');
            productionYear.classList.add('production__year');
            productionYear.textContent = elem.year;
      
            const productionCountries = document.createElement('div');
            productionCountries.classList.add('production__countries');
            productionCountries.textContent = elem.countries.map(
              (el) => '\n' + el.country
            );
      
            const movieAverage = document.createElement('div');
            movieAverage.classList.add('movie__average');
            let rating = await correctRatingPercent(elem.rating);
            movieAverage.textContent = rating;
            movieAverage.style.borderColor = colorRatingBorder(rating);
      
            movieInfo.append(
              movieTitle,
              movieCategory,
              productionCountries,
              productionYear,
              movieAverage
            );
            movieCart.append(movieCover, movieInfo);
            listMovies.append(movieCart);
            contentWrap.append(listMovies);
            root.append(contentWrap);
    });
  }
}
