import { getMovie, API_FILM_ACTORS, API_PERSONAL_ACTOR } from './api';
import { API_FILM_MODAL } from './api';

export const renderModalWindowMovie = async (data) => {
  const actorsData = await getMovie(API_FILM_ACTORS, data.kinopoiskId);
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

  const span2 = document.createElement('span');
  const x2 = document.createTextNode('\u00D7');
  span2.classList.add('close');
  span2.appendChild(x2);
  span2.addEventListener('click', () => {
    const forDelete = document.querySelector('.personal-info-wrap');
      forDelete.remove();
  });

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

        const interestingFacts = document.createElement('p');
        interestingFacts.classList.add('interesting-facts');
        interestingFacts.textContent = `Интересные факты: ${actorInfo.facts.map(el => '\n' + el)}`;

        const age = document.createElement('p');
        age.classList.add('actors-age');
        age.textContent = `Возраст, лет: ${actorInfo.age}`;

        const birthday = document.createElement('p');
        birthday.classList.add('actors-birth');
        birthday.textContent = `Дата рождения: ${actorInfo.birthday !== null ? actorInfo.birthday : '-'}`;

        const placeBirth = document.createElement('p');
        placeBirth.classList.add('place-birth');
        placeBirth.textContent = `Место рождения: ${actorInfo.birthplace !== null ? actorInfo.birthplace : '-'}`;

        const personFilms = document.createElement('div');
        personFilms.classList.add('films');
        personFilms.textContent = 'Фильмография: ';
        actorInfo.films.map(el => {
          if(el.nameRu !== null) {
            const actorFilm = document.createElement('p');
            actorFilm.classList.add('personal-film');
            actorFilm.textContent = el.nameRu;
            actorFilm.addEventListener('click', async () => {
              modal.remove();
              const data = await getMovie(API_FILM_MODAL, el.filmId);
              renderModalWindowMovie(data);
            });
            personFilms.append(actorFilm);
          }
        })

        personalInfoWrap.append(name, nameImg, age, birthday, placeBirth, profession, interestingFacts, personFilms, span2);
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
    modal.remove();
  };
};
