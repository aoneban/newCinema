export const createFooter = () => {
  const root = document.getElementById('root');
  const footer = document.createElement('footer');
  footer.classList.add('footer-wrapper');

  const footerList = document.createElement('ul');
  footerList.classList.add('footer-list');

  const one = document.createElement('li');
  one.classList.add('footer-items');
  one.textContent = 'One';

  const two = document.createElement('li');
  two.classList.add('footer-items');
  two.textContent = 'Two';

  const three = document.createElement('li');
  three.classList.add('footer-items');
  three.textContent = 'Three';

  const four = document.createElement('li');
  four.classList.add('footer-items');
  four.textContent = 'Four';

  footerList.append(one, two, three, four);
  footer.append(footerList);
  root.append(footer)
};
