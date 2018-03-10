import { Resp } from '../modules/dev/helpers';

const containers = [...document.querySelectorAll('.services__container')];
containers.forEach(element => {
  const video = element.querySelector('video');
  element.addEventListener('mouseenter', () => !Resp.isMobile && !video.playing && video.play());
  element.addEventListener('mouseleave', () => !Resp.isMobile && !video.paused && video.pause());
});
