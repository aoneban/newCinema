export const createHeader = () => {
    const root = document.getElementById('root');
    const header = document.createElement('header');
    header.classList.add('header-wrapper');

    const headerList = document.createElement('ul');
    headerList.classList.add('header-list')

    const imd7 = document.createElement('li');
    imd7.classList.add('header-items');
    imd7.textContent = 'NewCinema';

    const menu = document.createElement('li');
    menu.classList.add('header-items');
    menu.textContent = 'Menu';

    const inputSearch = document.createElement('input');
    inputSearch.setAttribute('type', 'text');
    inputSearch.setAttribute('placeholder', 'Search movie');
    inputSearch.classList.add('header-items', 'input-items');

    const buttonSearch = document.createElement('a');
    buttonSearch.setAttribute('type', 'button');
    buttonSearch.classList.add('header-items', 'header-link');
    buttonSearch.textContent = 'Search'

    const watchList = document.createElement('li');
    watchList.classList.add('header-items');
    watchList.textContent = 'Watchlist';

    const singIn = document.createElement('li');
    singIn.classList.add('header-items');
    singIn.textContent = 'SingIn';

    const enPl = document.createElement('li');
    enPl.classList.add('header-items');
    enPl.textContent = 'En';

    headerList.append(imd7, menu, inputSearch, buttonSearch, watchList, singIn, enPl)
    header.appendChild(headerList)
    root.appendChild(header);
}