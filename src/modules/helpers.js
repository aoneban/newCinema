import { getInfoMovieActors, API_FILM_ACTORS } from "./api";

export const colorRatingBorder = (rating) => {
  if (rating <= 3.99) {
    return 'red';
  } else if (rating >= 4 && rating < 6.99) {
    return 'orange';
  } else if (rating >= 7) {
    return 'green';
  } else {
    return 'grey';
  }
};

export const correctRatingPercent = (rating) => {
  return rating !== null ? rating.replace('.0%', '%') : 'N/R';
};

export const renderModalWindowMovie = async (data) => {

  const actorsData = await getInfoMovieActors(API_FILM_ACTORS, data.kinopoiskId)

  const modal = document.getElementById('myModal');

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  const modalImg = document.getElementById('img01');
  const captionText = document.getElementById('caption');
  const description = document.querySelector('.description-content');
  const actors = document.querySelector('.actors')

  description.textContent = data.description;
  modal.style.display = 'block';
  modalImg.src = data.posterUrl;
  captionText.innerHTML = data.nameRu;
  actors.innerHTML = actorsData.slice(0, 10).map(el => ` ${el.nameRu}`)

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName('close')[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = 'none';
  };
};

export const removeElements = (a,b,c) => {
  a.remove();
  b.remove();
  c.remove();
}