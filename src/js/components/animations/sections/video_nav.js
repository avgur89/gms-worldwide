import { DrawnText } from '../draw-title';
import { TweenToScroll } from '../scroll-animations';
import { MadParticles } from '../mad-particles';

[...document.querySelectorAll('.video_nav__item')].forEach((el, index) => {
  TweenToScroll({
    trigger: el.querySelector('.video_nav__text'),
    tl: function () {
      let drawnTextEl = el.querySelector('.drawn_text');
      return new DrawnText({
        title: drawnTextEl,
        speed: .6,
        delay: index / 4,
        titleBalls: new MadParticles({
          el: drawnTextEl.querySelector('.drawn_text__balls'),
          rows: 2,
          column: 24,
          reducedRow: 0,
          offsetLeft: [5, 15, 0],
          margin: [10, 10],
          center: .33
        })
      }).staggerFromTo(el.querySelectorAll('.video_nav__list li'), .6, {
        x: -25,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        ease: Power2.easeOut
      }, .1, '-=.6');
    }
  });
});

