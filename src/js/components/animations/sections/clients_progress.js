import { $window, Resp } from '../../../modules/dev/helpers';
import { DrawnText } from '../draw-title';
import { TweenToScroll } from '../scroll-animations';

[...document.querySelectorAll('.clients_progress__item')].forEach((el, index) => {
  TweenToScroll({
    trigger: el,
    tl: function () {
      let drawnTextEl = el.querySelector('.drawn_text');
      return new TimelineMax().fromTo(el.querySelector('.clients_progress__logo'), 1, {
        x: -25,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        ease: Power3.easeOut
      })
        .fromTo(el.querySelector('.clients_progress__text'), 1, {
          x: -40,
          opacity: 0
        }, {
          x: 0,
          opacity: 1,
          ease: Power3.easeOut
        }, '-=.9')
        .add(new DrawnText({
          title: drawnTextEl,
          speed: .6,
          staggerDelay: .08,
          reducedX: -50,
          toLeft: true
        }), '-=.5');
    }
  });
});

class ToSlick {
  constructor () {
    this.slider = document.querySelector('.clients_progress__items');

    if (!this.slider) return;

    this.separationBlocks();
    this.bindResize();
  }

  bindResize () {
    $window.on('resize', this.separationBlocks.bind(this));
  }

  separationBlocks () {

    if ($(this.slider).hasClass('slick-initialized')) {
      $(this.slider).slick('destroy');
    }
    const items = [...document.querySelectorAll('.clients_progress__item')];
    let oldWraps = [...this.slider.querySelectorAll('.separate-wrap')];
    let half = Math.ceil(items.length / 2);
    let remaining = items.length - half;
    if (Resp.isDesk && !oldWraps.length) {

      for (let k = 1; k <= 2; k++) {
        let wrap = document.createElement('div');
        wrap.classList.add('separate-wrap');
        for (let i = 1; i <= (k === 1 ? half : remaining); i++) {
          wrap.appendChild(items[0]);
          items.splice(0, 1);
        }
        this.slider.appendChild(wrap);
      }
      oldWraps.forEach(el => {
        this.slider.removeChild(el);
      });
    } else if (!Resp.isDesk) {
      items.forEach(el => {
        this.slider.appendChild(el);
      });
      oldWraps.forEach(el => {
        this.slider.removeChild(el);
      });
      $(this.slider).slick({
        dots: true, arrows: false, rows: 0, infinite: false, adaptiveHeight: true
      });
    }
  };
};

new ToSlick();
