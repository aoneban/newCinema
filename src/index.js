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

createHeader();
generateMovie(API_URL, 1);
setTimeout(paginationMovies, 1000);
createFooter();
initialSliderOne();
initialSliderTwo();
window.addEventListener('resize', initialSliderOne);
window.addEventListener('resize', initialSliderTwo);
