document.documentElement.classList.remove('no-js');

//Menu
const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.page-header__nav-toggle');
navMain.classList.add('main-nav--closed');

navToggle.addEventListener('click', function () {

  navMain.classList.toggle('main-nav--closed');
  navToggle.classList.toggle('burger-button--closed');
  navToggle.classList.toggle('burger-button--opened');

  if (navToggle.classList.contains('burger-button--opened')) {
    navToggle.setAttribute('aria-label', 'Закрыть меню');
  } else {
    navToggle.setAttribute('aria-label', 'Открыть меню');
  }
});
