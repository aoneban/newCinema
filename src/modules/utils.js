import {
  getMovie,
  API_URL,
  API_FILM_MODAL,
  API_FILMS_PREMIER,
  API_AWAIT_MOVIE,
  API_TOP_250,
} from './api';
import { createFooter } from '../pages/Footer';
import {
  colorRatingBorder,
  correctRatingPercent,
  removeElements,
} from './helpers';
import { renderModalWindowMovie } from './modal';

let count = 0;
let countTwo = 0;
let totalSliders = 0;
let totalSlidersTwo = 0;
let width;
let widthTwo;
// current page
let NUM_PAGE = 1;

export const generateMovie = async (url, id) => {
  const data = await getMovie(url, id);
  const dataPremier = await getMovie(API_FILMS_PREMIER, 'MARCH');
  const dataTop250 = await getMovie(API_TOP_250, 1);
  const dataAwaitMovie = await getMovie(API_AWAIT_MOVIE, 1);
  const root = document.getElementById('root');
  const contentWrap = document.createElement('main');
  contentWrap.classList.add('content-wrapper');

  const favoriteMovie = document.createElement('section');
  favoriteMovie.classList.add('favorite-movie');
  dataPremier.items.map((el) => {
    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('img-premier-wrapper');
    const imgPremier = document.createElement('img');
    imgPremier.classList.add('img-premier');
    imgPremier.src = el.posterUrlPreview;
    imgWrapper.append(imgPremier);
    imgWrapper.addEventListener('click', async () => {
      const data = await getMovie(API_FILM_MODAL, el.kinopoiskId);
      console.log(data.kinopoiskId);
      renderModalWindowMovie(data);
    });
    favoriteMovie.append(imgWrapper);
  });

  const wishMovie = document.createElement('section');
  wishMovie.classList.add('wish-movie');

  const sliderWrapperOne = document.createElement('div');
  sliderWrapperOne.classList.add('slider-one');
  const titleSliderOne = document.createElement('h3');
  titleSliderOne.classList.add('title-text')
  titleSliderOne.textContent = 'Ожидаемые фильмы';
  const sliders = document.createElement('div');
  sliders.classList.add('slider-one-line');
  dataAwaitMovie.films.map((el) => {
    const sliderWrap = document.createElement('div');
    sliderWrap.classList.add('slider-wrap');
    const imgSlider = document.createElement('img');
    imgSlider.src = el.posterUrlPreview;
    const title = document.createElement('h3');
    title.textContent = el.nameRu;
    sliderWrap.append(imgSlider, title);
    sliderWrap.addEventListener('click', async () => {
      const data = await getMovie(API_FILM_MODAL, el.filmId);
      console.log(data.kinopoiskId);
      renderModalWindowMovie(data);
    });
    sliders.append(sliderWrap);
  });

  const buttonsWrapper = document.createElement('div');
  buttonsWrapper.classList.add('buttons-wrapper');
  const buttonPrev = document.createElement('button');
  buttonPrev.classList.add('button', 'slider-prev');
  buttonPrev.textContent = 'Prev';
  buttonPrev.addEventListener('click', () => {
    count--;
    if (count < 0) {
      count = totalSliders / 4 - 1;
    }
    sliders.style.transform = 'translate(-' + count * width + 'px)';
  });
  const buttonNext = document.createElement('button');
  buttonNext.classList.add('button', 'slider-next');
  buttonNext.textContent = 'Next';
  buttonNext.addEventListener('click', () => {
    count++;
    if (count >= totalSliders / 4) {
      count = 0;
    }
    sliders.style.transform = 'translate(-' + count * width + 'px)';
  });
  buttonsWrapper.append(buttonPrev, buttonNext);
  sliderWrapperOne.append(titleSliderOne, sliders, buttonsWrapper);

  ///////////////////////////////////////////////////////
  const sliderWrapperTwo = document.createElement('div');
  sliderWrapperTwo.classList.add('slider-two');
  const titleSliderTwo = document.createElement('h3');
  titleSliderTwo.classList.add('title-text');
  titleSliderTwo.textContent = 'Топ 100';
  const slidersTwo = document.createElement('div');
  slidersTwo.classList.add('slider-two-line');
  dataTop250.films.map((el) => {
    const sliderWrap = document.createElement('div');
    sliderWrap.classList.add('slider-wrap-two');
    const imgSlider = document.createElement('img');
    imgSlider.src = el.posterUrlPreview;
    const title = document.createElement('h3');
    title.textContent = el.nameRu;
    sliderWrap.append(imgSlider, title);
    sliderWrap.addEventListener('click', async () => {
      const data = await getMovie(API_FILM_MODAL, el.filmId);
      console.log(data.kinopoiskId);
      renderModalWindowMovie(data);
    });
    slidersTwo.append(sliderWrap);
  });

  const buttonsWrapperTwo = document.createElement('div');
  buttonsWrapperTwo.classList.add('buttons-wrapper');
  const buttonPrevTwo = document.createElement('button');
  buttonPrevTwo.classList.add('button', 'slider-prev');
  buttonPrevTwo.textContent = 'Prev';
  buttonPrevTwo.addEventListener('click', () => {
    countTwo--;
    if (countTwo < 0) {
      countTwo = totalSlidersTwo / 4 - 1;
    }
    slidersTwo.style.transform = 'translate(-' + countTwo * widthTwo + 'px)';
  });
  const buttonNextTwo = document.createElement('button');
  buttonNextTwo.classList.add('button', 'slider-next');
  buttonNextTwo.textContent = 'Next';
  buttonNextTwo.addEventListener('click', () => {
    countTwo++;
    if (countTwo >= totalSlidersTwo / 4) {
      countTwo = 0;
    }
    slidersTwo.style.transform = 'translate(-' + countTwo * widthTwo + 'px)';
  });
  buttonsWrapperTwo.append(buttonPrevTwo, buttonNextTwo);
  sliderWrapperTwo.append(titleSliderTwo, slidersTwo, buttonsWrapperTwo);

  //////////////////////////////////////////////////////
  wishMovie.append(sliderWrapperOne, sliderWrapperTwo);

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
    contentWrap.append(listMovies, wishMovie, favoriteMovie);
    root.append(contentWrap);
  });
};

export const paginationMovies = () => {
  const contentWrap = document.querySelector('.content-wrapper');
  const root = document.getElementById('root');
  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('button-wrapper');

  const footerWrapper = document.querySelector('.footer-wrapper');

  const numberOfPage = document.createElement('p');
  numberOfPage.textContent = `Page: ${NUM_PAGE}`;

  const buttonTwo = document.createElement('button');
  const movies = document.querySelector('.content-wrapper');

  const buttonOne = document.createElement('button');
  buttonOne.textContent = '<';
  buttonOne.addEventListener('click', () => {
    NUM_PAGE--;
    if (NUM_PAGE < 1) {
      NUM_PAGE = 1;
    }
    removeElements(buttonWrapper, movies);
    generateMovie(API_URL, NUM_PAGE);
    initialSliderOne();
    initialSliderTwo();
    setTimeout(paginationMovies, 1000);
   // createFooter();
  });

  buttonTwo.textContent = '>';
  buttonTwo.addEventListener('click', () => {
    NUM_PAGE++;
    removeElements( buttonWrapper, movies);
    generateMovie(API_URL, NUM_PAGE);
    initialSliderOne();
    initialSliderTwo();
    setTimeout(paginationMovies, 1000);
    //createFooter();
  });

  buttonWrapper.append(buttonOne, numberOfPage, buttonTwo);
  contentWrap.append(buttonWrapper);
};

export const initialSliderOne = () => {
  setTimeout(() => {
    const images = document.querySelectorAll('.slider-wrap img');
    totalSliders = images.length;
    const sliderLine = document.querySelector('.slider-one');
    width = document.querySelector('.slider-one').offsetWidth;
    sliderLine.style.width = width * images.length + 'px';
    images.forEach((el) => {
      el.style.width = width / 4 + 'px';
      el.style.height = 'auto';
    });
  }, 1000);
};

export const initialSliderTwo = () => {
  setTimeout(() => {
    const images = document.querySelectorAll('.slider-wrap-two img');
    totalSlidersTwo = images.length;
    const sliderLine = document.querySelector('.slider-two');
    widthTwo = document.querySelector('.slider-two').offsetWidth;
    sliderLine.style.width = widthTwo * images.length + 'px';
    images.forEach((el) => {
      el.style.width = widthTwo / 4 + 'px';
      el.style.height = 'auto';
    });
  }, 1000);
};
