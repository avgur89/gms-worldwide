
import { DrawnText } from '../draw-title';
import { TweenToScroll } from '../scroll-animations';
import { ConvexParticles } from '../convex-particles';

[...document.querySelectorAll('.level_up__item')].forEach((el, index) => {
  TweenToScroll({
    trigger: el,
    tl: function () {
      return new DrawnText({
        title: el.querySelector('.drawn_text'),
        speed: .4,
        staggerDelay: .03,
        reducedX: 50,
        delay: (index) / 4
      }).fromTo(el.querySelector('.level_up__text'), .5, {
        y: 25,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        ease: Power2.easeOut
      }, '-=.3');
    }
  });
});
$(() => {
  [...document.querySelectorAll('.convex_particles')].forEach(el => {
    new ConvexParticles({
      offset: [185, 0],
      margin: [70, 90],
      container: el,
      strength: 0.5,
      color: '0xeceaea'
    });
  });
});

