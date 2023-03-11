import { getSearchMovie } from "../modules/search";

export const createHeader = () => {
  const root = document.getElementById('root');
  const header = document.createElement('header');
  header.classList.add('header-wrapper');

  const logo = document.createElement('a');
  logo.classList.add('logo-wrapper');
  logo.href = 'http://localhost:3000/';

  const logoName = document.createElement('p');
  logoName.classList.add('logo-name');
  logoName.textContent = 'NCinema';

  logo.appendChild(logoName);

  const headerList = document.createElement('div');
  headerList.classList.add('header-list');

  const headerWrapp = document.createElement('ul');
  headerWrapp.classList.add('header-wrapp');

  const menu = document.createElement('li');
  menu.classList.add('header-items', 'header-menu');
  menu.textContent = 'Menu';

  const inputWrapper = document.createElement('li');
  inputWrapper.classList.add('input-wrapper');

  const inputForm = document.createElement('form');
  inputForm.classList.add('input-form');
  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getSearchMovie();
  })

  const inputSearch = document.createElement('input');
  inputSearch.setAttribute('type', 'text');
  inputSearch.setAttribute('placeholder', 'Search movie');
  inputSearch.classList.add('header-items', 'input-items');

  const buttonSearch = document.createElement('input');
  buttonSearch.setAttribute('type', 'button');
  buttonSearch.setAttribute('value', 'Search');
  buttonSearch.classList.add('header-items', 'header-link');
  buttonSearch.addEventListener('click', getSearchMovie);

  inputForm.append(inputSearch, buttonSearch)
  inputWrapper.append(inputForm)

  const watchList = document.createElement('li');
  watchList.classList.add('header-items');
  watchList.textContent = 'Watchlist';

  const singIn = document.createElement('li');
  singIn.classList.add('header-items');
  singIn.textContent = 'SingIn';

  const enPl = document.createElement('li');
  enPl.classList.add('header-items');
  enPl.textContent = 'En';

  headerWrapp.append(
    logo,
    menu,
    inputWrapper,
    watchList,
    singIn,
    enPl
  );

  headerList.append(logo, headerWrapp);
  header.appendChild(headerList);
  root.appendChild(header);
};
