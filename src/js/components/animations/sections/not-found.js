import { TweenToScroll } from '../scroll-animations';

const elements = [...document.querySelectorAll('.not_found__item')];
const container = document.querySelector('.not_found');
TweenToScroll({
  trigger: container,
  tl: function () {
    return new TimelineMax()
      .staggerFrom(elements, .6, {
        y: '-100%',
        ease: Power2.easeOut
      }, .1, '+=.3', () => container.classList.add('animation-done'));
  }
});
