import { getMovie, getMovieValue } from './api';
import {
  API_FILM_MODAL,
  API_GET_TRAILERS,
  API_FILM_ACTORS,
  API_PERSONAL_ACTOR,
  API_FILM_IMAGES,
  API_OPINIONS,
} from './api';

let countOpinionStart = 0;
let countOpinionFinish = 3;

export const renderModalWindowMovie = async (data) => {
  //get actors to display in details
  const actorsData = await getMovie(API_FILM_ACTORS, data.kinopoiskId);
  const imageData = await getMovie(
    API_FILM_IMAGES,
    data.kinopoiskId + '/images?type=STILL'
  );
  const generateOpinions = await getMovieValue(
    API_OPINIONS,
    data.kinopoiskId + '/reviews?page'
  );
  const segregationOpinions = () => {
    return generateOpinions.items.filter((el) => el.type);
  };
  const positive = segregationOpinions();
  const newImageData = imageData.items.slice(0, 7);
  //get trailers to display in details
  const getTrailers = await getMovieValue(
    API_GET_TRAILERS,
    data.kinopoiskId,
    '/videos'
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
  modalImg.src = data.posterUrlPreview;
  modalImg.setAttribute('id', 'img01');
  modalImg.classList.add('modal-content');

  newImageData.forEach((el) => {
    const img = document.createElement('img');
    img.src = el.previewUrl;
    img.classList.add('additional-photos');
    imgWrapper.append(img);
  });

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
      imgActor.addEventListener('click', async () => {
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

        const interestingFacts = document.createElement('div');
        interestingFacts.classList.add('interesting-facts');
        actorInfo.facts.map((el) => {
          const oneIndFact = document.createElement('p');
          oneIndFact.classList.add('individual-fact');
          oneIndFact.textContent = el;
          interestingFacts.append(oneIndFact);
        });

        const age = document.createElement('p');
        age.classList.add('actors-age');
        age.textContent = `Возраст, лет: ${actorInfo.age}`;

        const birthday = document.createElement('p');
        birthday.classList.add('actors-birth');
        birthday.textContent = `Дата рождения: ${
          actorInfo.birthday !== null ? actorInfo.birthday : '-'
        }`;

        const placeBirth = document.createElement('p');
        placeBirth.classList.add('place-birth');
        placeBirth.textContent = `Место рождения: ${
          actorInfo.birthplace !== null ? actorInfo.birthplace : '-'
        }`;

        const personFilms = document.createElement('div');
        personFilms.classList.add('films');
        personFilms.textContent = 'Фильмография: ';
        const result = [];
        actorInfo.films.map((el) => {
          if (!result.includes(el.nameRu) && el.nameRu !== null) {
            result.push(el.nameRu);
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
        });
        result.length = 0;
        personalInfoWrap.append(
          name,
          nameImg,
          age,
          birthday,
          placeBirth,
          profession,
          interestingFacts,
          personFilms,
          span2
        );
        modalWrapper.append(personalInfoWrap);
      });

      const actorName = document.createElement('p');
      actorName.classList.add('actor-name');
      actorName.textContent = el.nameRu;

      actorsWrapper.append(imgActor, actorName);
      setActors.append(actorsWrapper);
    }
  });

  const span2 = document.createElement('span');
  const x2 = document.createTextNode('\u00D7');
  span2.classList.add('close');
  span2.appendChild(x2);
  span2.addEventListener('click', () => {
    const forDelete = document.querySelector('.personal-info-wrap');
    forDelete.remove();
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

  const detailsVideo = document.createElement('details');
  const summaryVideo = document.createElement('summary');
  const wrapperVideos = document.createElement('div');
  wrapperVideos.classList.add('wrapper-videos');
  summaryVideo.textContent = 'Трейлеры';
  const textMessage = document.createElement('p');
  textMessage.classList.add('text-message');
  textMessage.textContent =
    'Сожалеем, но к данному фильму трейлеров не найдено...';
  detailsVideo.append(textMessage);

  getTrailers.items.slice(0, 15).map((el, ind) => {
    const videoTrailer = document.createElement('video');
    if (el.url.includes('volgafilm')) {
      textMessage.remove();
      videoTrailer.classList.add('movie-trailer');
      videoTrailer.src = el.url;
      videoTrailer.controls = true;
      videoTrailer.muted = false;
      videoTrailer.height = 180;
      videoTrailer.width = 220;
      wrapperVideos.append(videoTrailer);
    } else if (el.url.includes('watch?')) {
      textMessage.remove();
      const iframe = document.createElement('iframe');
      iframe.classList.add('iframe-videos');
      const replaceLink = el.url.replace('watch?v=', 'embed/');
      iframe.classList.add('movie-trailer');
      iframe.src = replaceLink;
      iframe.controls = true;
      iframe.muted = false;
      iframe.height = 180;
      iframe.width = 220;
      wrapperVideos.append(iframe);
    } else if (el.url.includes('/v/')) {
      textMessage.remove();
      const iframe = document.createElement('iframe');
      iframe.classList.add('iframe-videos');
      const replaceLink = el.url.replace('/v/', '/embed/');
      iframe.classList.add('movie-trailer');
      iframe.src = replaceLink;
      iframe.controls = true;
      iframe.muted = false;
      iframe.height = 180;
      iframe.width = 220;
      wrapperVideos.append(iframe);
    } else if (el.url.includes('utu.be')) {
      textMessage.remove();
      const iframe = document.createElement('iframe');
      iframe.classList.add('iframe-videos');
      const replaceLink = el.url.replace('youtu.be', 'www.youtube.com/embed');
      iframe.classList.add('movie-trailer');
      iframe.src = replaceLink;
      iframe.controls = true;
      iframe.muted = false;
      iframe.height = 180;
      iframe.width = 220;
      wrapperVideos.append(iframe);
    }
  });

  detailsVideo.append(summaryVideo, wrapperVideos);

  const opinionsWrapper = document.createElement('div');
  opinionsWrapper.className = 'opinions-wrapper';
  const opinions = document.createElement('h3');
  opinions.textContent = 'Отзывы о фильме';
  const opinionGeneretor = (item, words) => {
    if (typeof item !== 'undefined') {
      item.forEach((el, ind) => { 
        if (ind >= countOpinionStart && ind < countOpinionFinish) { 
          const opinionItem = document.createElement('div');
          opinionItem.className = 'opinion-item';
          const opinionType = document.createElement('p');
          opinionType.textContent = el.type;
          const opinionTitle = document.createElement('h4');
          opinionTitle.className = 'opinion-title';
          opinionTitle.textContent = el.title;
          const opinionAuthor = document.createElement('h5');
          opinionAuthor.className = 'opinion-author';
          opinionAuthor.textContent = 'Автор: ' + el.author;
          const opinionText = document.createElement('p');
          opinionText.className = 'opinion-text';
          opinionText.textContent = el.description.replace(/<[^>]+>/g, '').slice(0, words) + '...';
          const fullOpinion = document.createElement('a');
          fullOpinion.className = 'opinion-link';
          fullOpinion.textContent = 'Читать полностью';
          fullOpinion.addEventListener('click', () => {
            const opinionTitle = document.createElement('h4');
            opinionTitle.className = 'opinion-title';
            opinionTitle.textContent = el.title;
            const opinionAuthor = document.createElement('h5');
            opinionAuthor.className = 'opinion-author';
            opinionAuthor.textContent = 'Автор: ' + el.author;
            const modalWrapper = document.getElementById('root');
            const descriptopnWrap = document.createElement('div');
            descriptopnWrap.classList.add('description-info-wrap')
            descriptopnWrap.textContent = el.description.replace(/<[^>]+>/g, '');
            const close = document.createElement('button');
            close.className = 'btn';
            close.textContent = 'Закрыть';
            if (el.type === 'POSITIVE') {
              descriptopnWrap.classList.add('b1')
            } else if (el.type === 'NEUTRAL') {
              descriptopnWrap.classList.add('b2')
            } else {
              descriptopnWrap.classList.add('b3')
            }
            window.scrollTo(0, 0);
            close.addEventListener('click', () => {
              document.querySelector('.description-info-wrap').remove()
              document.getElementById('myModal').style.opacity = 1;
              document.querySelector('.content-wrapper').style.opacity = 1;
            })
            document.getElementById('myModal').style.opacity = 0;
            document.querySelector('.content-wrapper').style.opacity = 0;
            descriptopnWrap.append(close)
            descriptopnWrap.insertAdjacentElement('afterbegin', opinionAuthor);
            descriptopnWrap.insertAdjacentElement('afterbegin', opinionTitle);
            modalWrapper.append(descriptopnWrap);
          });
          if (el.type === 'POSITIVE') {
            opinionItem.classList.add('b1')
          } else if (el.type === 'NEUTRAL') {
            opinionItem.classList.add('b2')
          } else {
            opinionItem.classList.add('b3')
          }
          opinionItem.append(opinionType, opinionAuthor, opinionTitle, opinionText, fullOpinion);
          return opinionsWrapper.append(opinionItem);
        }
      })
    } else {
      return
    }
  }

  const buttonOpinion = document.createElement('button');
  buttonOpinion.textContent = 'Следующие отзывы >>';
  buttonOpinion.classList.add('btn', 'btn2')
  buttonOpinion.addEventListener('click', () => {
    countOpinionStart += 3;
    countOpinionFinish += 3;
    if (countOpinionFinish > positive.length) {
      countOpinionStart = 0;
      countOpinionFinish = 3;
    }
    const old = document.querySelectorAll('.opinion-item');
    old.forEach(el => el.remove())
    opinionGeneretor(positive, 300);
  })

  opinionGeneretor(positive, 300);


  dataMovies.append(
    dateOfRelise,
    details,
    genreItem,
    durationItem,
    descContent,
    detailsVideo,
    opinions,
    opinionsWrapper,
    buttonOpinion
  );
  modalWrapper.append(titleWrapper, imgWrapper, ratingWrapper, dataMovies);
  modal.append(modalWrapper, span);
  root.append(modal);

  modal.style.display = 'block';

  span.onclick = function () {
    modal.remove();
  };
  if (positive.length < 1) {
    document.querySelector('.btn').style.display = 'none';
    document.querySelector('.btn2').style.display = 'none'
  }
};


