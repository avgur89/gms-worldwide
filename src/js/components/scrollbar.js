import Scrollbar from 'smooth-scrollbar';

[...document.querySelectorAll('[data-scrollbar]')].forEach(el => {
  Scrollbar.init(el);
});

