import './index.html';
import './index.scss';
import { API_URL, getMovie, API_FILMS_PREMIER } from './modules/api';
import { createHeader } from './pages/Header';
import {
  generateMovie,
  getFavoritMovie,
  paginationMovies,
} from './modules/utils';
import { createFooter } from './pages/Footer';

createHeader();
generateMovie(API_URL, 1);
setTimeout(paginationMovies, 1000);
createFooter();

