import './index.html';
import './index.scss';
import { API_URL } from './modules/api';
import { createHeader } from './pages/Header';
import {
  generateMovie,
  paginationMovies,
  initialSliderOne,
  initialSliderTwo,
} from './modules/utils';
import { createFooter } from './pages/Footer';

let width;
let totalSliders = 0;
const startRender = () => {
  createHeader();
  generateMovie(API_URL, 1);
  setTimeout(paginationMovies, 4000);
};
startRender();
//createFooter();
window.addEventListener('load', initialSliderOne);
window.addEventListener('load', initialSliderTwo);
window.addEventListener('resize', initialSliderOne);
window.addEventListener('resize', initialSliderTwo);




