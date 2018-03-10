import { MadParticles } from '../mad-particles';

const balls = new MadParticles({
  el: document.querySelector('.sub_first_screen__balls'),
  rows: 6,
  offsetLeft: [0, 35, 80, 30, -30, 75],
  margin: [10, 10],
  autoPlaySpeed: 3000,
  autoPlay: true,
  center: .3
});
