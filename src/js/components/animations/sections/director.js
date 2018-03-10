import { TweenToScroll } from '../scroll-animations';
import { MadParticles } from '../mad-particles';
import { DrawnText } from '../draw-title';

let title = document.querySelector('.director__title');

TweenToScroll({
  trigger: title,
  tl: function () {
    return new DrawnText({
      title: title,
      speed: .8,
      staggerDelay: .05,
      reducedX: 15,
      titleBalls: new MadParticles({
        el: title.querySelector('.drawn_text__balls'),
        rows: 6,
        offsetLeft: [0, 35, 80, 30, -30, 75],
        margin: [10, 10],
        autoPlaySpeed: 3000
      })
    }).add(TweenMax.from('.director__text', 1, {
      x: -100,
      opacity: 0,
      ease: Power3.easeOut
    }), '-=.8');
  }
});

