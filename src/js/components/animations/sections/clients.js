import { TweenToScroll } from '../scroll-animations';
let container = document.querySelector('.clients__items');
TweenToScroll({
  trigger: container,
  tl: function () {
    const items = container.querySelectorAll('.clients__item:not(.slick-cloned) .img');
    return new TimelineMax().staggerFromTo(items, 1.2, {
      x: -60,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      ease: Power3.easeOut
    }, .08)
      .set(container, { className: '+=animation-done' }, '-=.3');
  }
});
