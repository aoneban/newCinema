import { getMovie, API_URL, API_FILM_MODAL } from './api';
import { createFooter } from '../pages/Footer';
import { colorRatingBorder, correctRatingPercent, removeElements } from './helpers';
import { renderModalWindowMovie } from './modal';

export const getFavoritMovie = () => {
  const favoriteMovie = document.createElement('section');
  favoriteMovie.classList.add('favorite-movie');

  const img = document.createElement('img');
  img.src = 'https://picsum.photos/910/400';
  favoriteMovie.append(img);
  favoriteMovie.style.overflow = 'hidden';
  return favoriteMovie;
};

export const getWishMovie = () => {
  const wishMovie = document.createElement('section');
  wishMovie.classList.add('wish-movie');
  return wishMovie;
};

export const generateMovie = async (url, id, f1, f2) => {
  const data = await getMovie(url, id);
  const root = document.getElementById('root');
  const contentWrap = document.createElement('main');
  contentWrap.classList.add('content-wrapper');

  data.films.forEach(async (elem) => {
    const listMovies = document.createElement('div');
    listMovies.classList.add('list-movies');
    listMovies.addEventListener('click', async () => {
      const data = await getMovie(API_FILM_MODAL, elem.filmId);
      console.log(data.filmId);
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
    productionCountries.textContent = elem.countries.map((el) => '\n' + el.country);

    const movieAverage = document.createElement('div');
    movieAverage.classList.add('movie__average');
    let rating = await correctRatingPercent(elem.rating);
    movieAverage.textContent = rating;
    movieAverage.style.borderColor = colorRatingBorder(rating);

    movieInfo.append(movieTitle, movieCategory, productionCountries, productionYear, movieAverage);
    movieCart.append(movieCover, movieInfo);
    listMovies.append(movieCart);
    contentWrap.append(listMovies, f1, f2);
    root.append(contentWrap);
  });
};

// current page
let NUM_PAGE = 1;

export const paginationMovies = () => {
  const contentWrap = document.querySelector('.content-wrapper')
  const root = document.getElementById('root');
  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('button-wrapper');

  const footerWrapper = document.querySelector('.footer-wrapper');

  const numberOfPage = document.createElement('p');
  numberOfPage.textContent = `Page number: ${NUM_PAGE}`;

  const buttonTwo = document.createElement('button');
  const movies = document.querySelector('.content-wrapper');

  const buttonOne = document.createElement('button');
  buttonOne.textContent = '< prev';
  buttonOne.addEventListener('click', () => {
    NUM_PAGE--;
    if (NUM_PAGE < 1) {
      NUM_PAGE = 1;
    }
    removeElements(footerWrapper, buttonWrapper, movies);
    generateMovie(API_URL, NUM_PAGE, getFavoritMovie(), getWishMovie());
    setTimeout(paginationMovies, 1000);
    createFooter();
  });

  buttonTwo.textContent = 'next >';
  buttonTwo.addEventListener('click', () => {
    NUM_PAGE++;
    removeElements(footerWrapper, buttonWrapper, movies);
    generateMovie(API_URL, NUM_PAGE, getFavoritMovie(), getWishMovie());
    setTimeout(paginationMovies, 1000);
    createFooter();
  });

  buttonWrapper.append(buttonOne, numberOfPage, buttonTwo);
  contentWrap.append(buttonWrapper);
};

