import { getInfoMovieActors, API_FILM_ACTORS } from './api';

export const renderModalWindowMovie = async (data) => {
  const actorsData = await getInfoMovieActors(
    API_FILM_ACTORS,
    data.kinopoiskId
  );
  const root = document.getElementById('root');

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.setAttribute('id', 'myModal');

  const modalWrapper = document.createElement('div');
  modalWrapper.classList.add('modal-wrapper');

  const span = document.createElement('span');
  const x = document.createTextNode('\u00D7');
  span.classList.add('close');
  span.appendChild(x);

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('title-wrapper');

  const filmTitleRu = document.createElement('h1');
  filmTitleRu.classList.add('film-title-ru');
  filmTitleRu.textContent = data.nameRu;

  const filmTitleEn = document.createElement('span');
  filmTitleEn.classList.add('film-title-en');
  filmTitleEn.textContent = data.nameOriginal;

  titleWrapper.append(filmTitleRu, filmTitleEn);

  const imgWrapper = document.createElement('div');
  imgWrapper.classList.add('img-wrapper');

  const modalImg = document.createElement('img');
  modalImg.src = data.posterUrl;
  modalImg.setAttribute('id', 'img01');
  modalImg.classList.add('modal-content');

  imgWrapper.append(modalImg);

  const ratingWrapper = document.createElement('div');
  ratingWrapper.classList.add('rating-wrapper');

  const ratingList = document.createElement('ul');
  ratingList.classList.add('rating-list');

  const ratingValueOne = document.createElement('li');
  ratingValueOne.classList.add('rating-value');
  ratingValueOne.innerHTML = `IMDB: ${data.ratingImdb !== null ? data.ratingImdb : '-'}`;

  const ratingValueTwo = document.createElement('li');
  ratingValueTwo.classList.add('rating-value');
  ratingValueTwo.textContent = '|';

  const ratingValueThree = document.createElement('li');
  ratingValueThree.classList.add('rating-value');
  ratingValueThree.textContent = `Кинопоиск: ${data.ratingKinopoisk !== null ? data.ratingKinopoisk : '-'}`;

  ratingList.append(ratingValueOne, ratingValueTwo, ratingValueThree);
  ratingWrapper.append(ratingList);

  const dataMovies = document.createElement('div');
  dataMovies.classList.add('data-movies');

  const dateOfRelise = document.createElement('p');
  dateOfRelise.classList.add('date-relise');
  dateOfRelise.textContent = `Дата релиза: ${data.year} год`;

  const details = document.createElement('details');
  const summary = document.createElement('summary');
  summary.textContent = 'Актеры';

  const setActors = document.createElement('div');
  setActors.classList.add('set-actors');
  const actorDataWrapp = actorsData.slice(0, 13).map((el) => {
    const actorsWrapper = document.createElement('div');
    actorsWrapper.classList.add('actors-wrapper');

    const imgActor = document.createElement('img');
    imgActor.classList.add('img-actor');
    imgActor.src = el.posterUrl;
    imgActor.alt = el.nameRu;
    imgActor.width = 50;

    const actorName = document.createElement('p');
    actorName.classList.add('actor-name');
    actorName.textContent = el.nameRu;

    actorsWrapper.append(imgActor, actorName);
    setActors.append(actorsWrapper)
  });
  ;
  details.append(summary, setActors);

  const genreItem = document.createElement('p');
  genreItem.classList.add('genre');
  genreItem.innerHTML = `Жанр: ${data.genres.map((el) => ' ' + el.genre)}`;

  const durationItem = document.createElement('p');
  durationItem.classList.add('duration');
  durationItem.textContent = `Продолжительность: ${data.filmLength} минут`;

  const descContent = document.createElement('p');
  descContent.classList.add('description-content');
  descContent.textContent = data.description;

  dataMovies.append(
    dateOfRelise,
    details,
    genreItem,
    durationItem,
    descContent
  );
  modalWrapper.append(titleWrapper, imgWrapper, ratingWrapper, dataMovies);
  modal.append(modalWrapper, span);
  root.append(modal);

  modal.style.display = 'block';

  span.onclick = function () {
    modal.style.display = 'none';
  };
};
