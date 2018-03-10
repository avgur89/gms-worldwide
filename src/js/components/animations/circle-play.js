import { TweenMax } from 'gsap';

class CirclePlay {
  constructor (options) {
    this.options = options;
    return this.init();
  }

  init () {
    let clipPath = this.clipPath = this.options.selector.querySelector('defs circle');
    let circle = this.circle = this.options.selector.querySelector('g circle');
    let triangle = this.triangle = this.options.selector.querySelector('g path');

    TweenMax.set(clipPath, { transformOrigin: '50% 50%', scale: 0 });
    TweenMax.set(circle, { transformOrigin: '50% 50%', scale: 1.2 });
    TweenMax.set(triangle, { transformOrigin: '50% 50%', x: -60 });
  }

  show (delay) {
    let tl = new TimelineMax({ delay: delay || 0 });

    tl.to(this.clipPath, 1, {
      scale: 1,
      ease: CustomEase.create('custom', 'M0,0 C0.126,0.112 0.172,0.176 0.232,0.278 0.28,0.36 0.314,0.45 0.334,0.54 0.385,0.772 0.438,1.049 0.578,1.09 0.738,1.136 0.838,1 1,1')
    })
      .to(this.triangle, .6, { x: 0, ease: Power1.easeOut }, '-=.9')
      .set(this.options.selector, { className: '+=shadow_on' }, '-=.3');
    return tl;
  }
};

[...document.querySelectorAll('.circle_play--js')].forEach((el, index) => {
  el.circlePlay = new CirclePlay({ selector: el });
});

// example
// setTimeout(() => {
//   let example = document.querySelector('.circle_play');
//   if (example) example.circlePlay.show();
// }, 1000);
