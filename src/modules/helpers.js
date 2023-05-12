import { months } from "./data";

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

export const removeElements = (a, b) => {
  a.remove();
  b.remove();
};

export const createMenu = () => {
  const myNav = document.createElement('div');
  myNav.setAttribute('id', 'myNav');
  myNav.classList.add('overlay');

  const spanBtn = document.createElement('span');
  spanBtn.innerHTML = `<span class="closebtn">&times;</span>`;

  const overlayContent = document.createElement('ul');
  overlayContent.classList.add('overlay-content');

  const itemOne = document.createElement('li');
  itemOne.textContent = 'Actors';
  const itemTwo = document.createElement('li');
  itemTwo.textContent = 'Films';
  const itemThree = document.createElement('li');
  itemThree.textContent = 'Premiers';
  const itemFour = document.createElement('li');
  itemFour.textContent = 'Opinions';

  overlayContent.append(itemOne, itemTwo, itemThree, itemFour);

  myNav.append(spanBtn, overlayContent);
  root.append(myNav);
};


const getCurrentMonth = (months) => {
const date = new Date().getMonth();
return months[date];
}

export const generarateMonth = getCurrentMonth(months)