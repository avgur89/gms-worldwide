import { MadParticles } from './mad-particles';

[...document.querySelectorAll('.rect_btn')].forEach(el => {
  const ballsParent = el.querySelector('.rect_btn__balls');

  const particles = new MadParticles({
    el: ballsParent,
    rows: 2,
    columns: 30,
    offsetLeft: [0, 55],
    margin: [10, 20],
    center: .5,
    color: '#333333',
    autoPlay: false
  });

  el.addEventListener('mouseenter', () => {
    particles.play();
  });
});
