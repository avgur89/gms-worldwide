import { TweenToScroll } from '../scroll-animations';
import { MadParticles } from '../mad-particles';
import { DrawnText } from '../draw-title';

let items = [...document.querySelectorAll('.events__item')];
items.forEach((el, index) => {
  el.balls = new MadParticles({
    el: el.querySelector('.events__description_balls'),
    rows: 3,
    column: 10,
    reducedRow: 0,
    offsetLeft: [5, 15, 0],
    margin: [7, 5],
    radius: 2,
    center: .70,
    color: '#fff',
    delay: .2 * index
  });
  TweenToScroll({
    trigger: el,
    tl: function () {
      let title = el.querySelector('.drawn_text');

      let tl = new TimelineMax({
        onComplete: () => el.balls.play(true)
      });
      if (title) {

        tl.add(new DrawnText({
          title: title,
          speed: .8,
          reducedX: 5
        }), '-=.5');
      }
      return tl;
    }
  });
});

