import './index.html';
import './index.scss';
import { API_URL, API_FILM_MODAL } from './modules/api';
import { createHeader } from './pages/Header';
import { generateMovie, getFavoritMovie, getWishMovie, paginationMovies } from './modules/utils';
import { createFooter } from './pages/Footer';
import { getModalWindowMovie } from './modules/api';

createHeader();
generateMovie(API_URL, 1, getFavoritMovie(), getWishMovie());
setTimeout(paginationMovies, 500)
createFooter();
