import { ConvexParticles } from '../convex-particles';

const canvas = document.querySelector('.contact_form__convex_particles');

new ConvexParticles({
  offset: [-23, 0],
  margin: [70, 90],
  container: canvas,
  strength: 0.5,
  color: '0x70c58c'
});
