import { getMovie } from "./api";

export const generateMovie = async (url) => {
    const data = await getMovie(url);
    const root = document.getElementById('root');
    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrapper');
    const favoriteMovie = document.createElement('div');
    favoriteMovie.classList.add('favorite-movie');
    const wishMovie = document.createElement('div');
    wishMovie.classList.add('wish-movie');
  
    data.films.forEach((elem) => {
      const listMovies = document.createElement('div');
      listMovies.classList.add('list-movies2');
  
      const movieCart = document.createElement('div');
      movieCart.classList.add('movie__cart');
  
      const movieCover = document.createElement('div');
      movieCover.classList.add('movie__cover-inner');
  
      const img = document.createElement('img');
      img.classList.add('poster-img');
      img.src = elem.posterUrlPreview;
      img.alt = elem.nameRu;
  
      movieCover.append(img);
  
      const movieInfo = document.createElement('div');
      movieInfo.classList.add('movie__info');
  
      const movieTitle = document.createElement('div');
      movieTitle.classList.add('movie__title');
      movieTitle.textContent = elem.nameRu;
  
      const movieCategory = document.createElement('div');
      movieCategory.classList.add('movie__category');
      movieCategory.textContent = elem.genres.map((el) =>'\n' + el.genre);
  
      const movieAverage = document.createElement('div');
      movieAverage.classList.add('movie__average');
      movieAverage.textContent = elem.rating;
  
      movieInfo.append(movieTitle, movieCategory, movieAverage);
      movieCart.append(movieCover, movieInfo);
      listMovies.append(movieCart);
      contentWrap.append(listMovies, favoriteMovie, wishMovie);
      root.append(contentWrap);
    });
  };