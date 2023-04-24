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

const startRender = () => {
  createHeader();
  generateMovie(API_URL, 1);
  setTimeout(paginationMovies, 4000);
};
startRender();
//setTimeout(createFooter, 1000)
window.addEventListener('load', initialSliderOne);
window.addEventListener('load', initialSliderTwo);
window.addEventListener('resize', initialSliderOne);
window.addEventListener('resize', initialSliderTwo);




