import { TweenToScroll } from '../scroll-animations';
let section = document.querySelector('.about_us__flex');

if (section) {

  let paths = [...section.querySelectorAll('circle, path, line, polygon, polyline')];
  let text = [...section.querySelectorAll('.about_us__right_item h3, .about_us__right_item p')];
  let columns = [...section.querySelectorAll('.about_us__col')];

  TweenToScroll({
    trigger: section,
    tl: function () {
      return new TimelineMax({})
        .staggerFromTo(columns, 1, {
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
