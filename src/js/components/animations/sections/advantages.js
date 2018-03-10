import { TweenToScroll } from '../scroll-animations';
let section = document.querySelector('.advantages__flex');

if (section) {

  let paths = [...section.querySelectorAll('circle, path, line, polygon, polyline')];
  let text = [...section.querySelectorAll('.advantages__icon h3, .advantages__right_item p')];
  let title = [...section.querySelectorAll('.advantages__title')];

  TweenToScroll({
    trigger: section,
    tl: function () {
      return new TimelineMax({})
        .staggerFromTo(title, 1, {
          x: -40,
          opacity: 0
        }, {
          x: 0,
          opacity: 1,
          ease: Power3.easeOut
        }, .2)
        .fromTo(paths, 1.2, { drawSVG: 0 }, {
          drawSVG: '100%', ease: Power4.easeOut
        }, '-=.8')
        .staggerFromTo(text, 1.2, {
          x: -40,
          opacity: 0
        }, {
          x: 0,
          opacity: 1,
          ease: Expo.easeOut
        }, .14, '-=.8');
    }
  });
}