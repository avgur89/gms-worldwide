import { TweenToScroll } from '../scroll-animations';
import { MadParticles } from '../mad-particles';

const team = document.querySelector('.team__bottom');
if (team) {
  const teammates = [...team.querySelectorAll('.team__item')];
  const balls = new MadParticles({
    el: team.querySelector('.team__balls'),
    rows: 6,
    offsetLeft: [0, 35, 80, 30, -30, 75],
    margin: [10, 10],
    center: .6,
    autoPlaySpeed: 3000
  });
  TweenToScroll({
    trigger: team,
    tl: function () {
      return new TimelineMax({})
        .staggerFrom(teammates.sort((el) => {
          const index = teammates.indexOf(el) + 1;
          if (index % 3 === 0) {
            return -1;
          } else if (index % 2 === 0) return 1;
        }), 1, {
          opacity: 0,
          onComplete: () => {
            balls.play(true);
            team.classList.add('animation-done');
          }
        }, .12);
    }
  });
}

