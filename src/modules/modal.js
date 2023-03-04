import { getMovie, API_FILM_ACTORS, API_PERSONAL_ACTOR } from './api';
import { f10 } from './helpers';

export const renderModalWindowMovie = async (data) => {
  const actorsData = await getMovie(API_FILM_ACTORS, data.kinopoiskId);
  const root = document.getElementById('root');

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.setAttribute('id', 'myModal');
  modal.addEventListener('click', (e) => {
    const forDelete = document.querySelector('.personal-info-wrap');
    if(e.target !== forDelete) {
      forDelete.remove();
    }
  });

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
  ratingValueOne.innerHTML = `IMDB: ${
    data.ratingImdb !== null ? data.ratingImdb : '-'
  }`;

  const ratingValueTwo = document.createElement('li');
  ratingValueTwo.classList.add('rating-value');
  ratingValueTwo.textContent = '|';

  const ratingValueThree = document.createElement('li');
  ratingValueThree.classList.add('rating-value');
  ratingValueThree.textContent = `Кинопоиск: ${
    data.ratingKinopoisk !== null ? data.ratingKinopoisk : '-'
  }`;

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
  actorsData.slice(0, 13).map(async (el) => {
    if (el.nameRu !== '') {
      const actorsWrapper = document.createElement('div');
      actorsWrapper.classList.add('actors-wrapper');

      const imgActor = document.createElement('img');
      imgActor.classList.add('img-actor');
      imgActor.src = el.posterUrl;
      imgActor.alt = el.nameRu;
      imgActor.addEventListener('mouseover', async () => {
        const actorInfo = await getMovie(API_PERSONAL_ACTOR, el.staffId);

        const modalWrapper = document.querySelector('.modal-wrapper');
        const personalInfoWrap = document.createElement('div');
        personalInfoWrap.classList.add('personal-info-wrap');

        const nameImg = document.createElement('img');
        nameImg.classList.add('personal-info');
        nameImg.src = actorInfo.posterUrl;

        const name = document.createElement('h2');
        name.textContent = actorInfo.nameRu;

        const profession = document.createElement('p');
        profession.classList.add('profession');
        profession.textContent = `Профессия: ${actorInfo.profession}`;

        const age = document.createElement('p');
        age.classList.add('actors-age');
        age.textContent = `Возраст, лет: ${actorInfo.age}`;

        const placeBirth = document.createElement('p');
        placeBirth.classList.add('place-birth');
        placeBirth.textContent = actorInfo.birthplace;

        const films = document.createElement('p');
        films.classList.add('films');
        films.innerHTML = `Фильмография: ${f10(actorInfo.films)}`

        personalInfoWrap.append(name, nameImg, age, placeBirth, profession, films);
        modalWrapper.append(personalInfoWrap);
      });

      const actorName = document.createElement('p');
      actorName.classList.add('actor-name');
      actorName.textContent = el.nameRu;

      actorsWrapper.append(imgActor, actorName);
      setActors.append(actorsWrapper);
    }
  });
  details.append(summary, setActors);

  const genreItem = document.createElement('p');
  genreItem.classList.add('genre');
  genreItem.innerHTML = `Жанр: ${data.genres.map((el) => ' ' + el.genre)}`;

  const durationItem = document.createElement('p');
  durationItem.classList.add('duration');
  durationItem.textContent = `Продолжительность: ${
    data.filmLength !== null ? data.filmLength + ' минут' : '-'
  }`;

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
