import { isScrolledIntoView, debounce } from '../modules/dev/helpers';
import { PreloaderAPI } from './preloader';

export const videoIntoView = () => {
  $('video[data-autoplay]').each((index, el) => {

    let inView = isScrolledIntoView($(el));
    if (inView && el.paused) {
      el.play();
    } else if (!inView && el.played) {
      el.pause();
    }
  });
};
PreloaderAPI.then(videoIntoView);
$(window).on('scroll', debounce(videoIntoView, null, 200));
