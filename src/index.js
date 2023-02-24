import './index.html';
import './index.scss';
import { API_URL } from './modules/api';
import { createHeader } from './pages/Header';
import { generateMovie } from './modules/utils';

createHeader();
generateMovie(API_URL);