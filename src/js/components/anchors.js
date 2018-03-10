import { Resp } from '../modules/dev/helpers';

window.animateScroll = ({ offset, duration = 400, delay = 0, callback = () => {} }) => {
  let isSafari = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
  console.log(isSafari);
  if (navigator.userAgent.indexOf('Safari') > -1) {
    setTimeout(() => { $('html, body').animate({ scrollTop: offset }, duration, 'linear', callback); }, delay);
  } else {
    TweenMax.to(window, duration / 1000, {
      scrollTo: offset,
      delay: delay / 1000,
      ease: Power1.easeOut,
      onComplete: callback
    });
  }
};

[...document.querySelectorAll('[data-form-anchor]')].forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    let form = document.querySelector(el.getAttribute('data-form-anchor'));
    if (!form) return;
    window.animateScroll({
      offset: form.offsetTop,
      duration: 800,
      callback: () => {
        form.inlineForm.open(true);
      }
    });
  });
});
