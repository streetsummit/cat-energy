var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.page-header__nav-toggle');

navMain.classList.remove('no-js');
navToggle.classList.remove('visually-hidden');
navToggle.classList.add('burger-button');

navToggle.addEventListener('click', function () {

  navMain.classList.toggle('main-nav--closed');
  navMain.classList.toggle('main-nav--opened');
  navToggle.classList.toggle('burger-button--closed');
  navToggle.classList.toggle('burger-button--opened');
});
