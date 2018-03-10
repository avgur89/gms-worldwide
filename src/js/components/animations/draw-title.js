import { TweenToScroll } from './scroll-animations';
import { MadParticles } from './mad-particles';
import { PreloaderAPI } from '../preloader';
import '../../modules/dep/SplitText';

export class DrawnText {
  constructor (options) {
    this.options = options;
    this.reducedX = this.options.reducedX || 15;
    this.toLeft = this.options.toLeft;
    this.delay = this.options.delay || 0;
    this.staggerDelay = this.options.staggerDelay || .06;
    this.wrapper = this.options.title;
    this.overflowEl = this.options.title.querySelector('.drawn_text__overflow');
    return this.init();
  }

  setChars () {
    let text = new SplitText(this.overflowEl, { type: 'words,chars', wordsClass: 'word' });
    this.chars = text.chars;
  }

  init () {
    this.setChars();
    this.titleBalls = this.options.titleBalls || new MadParticles({
      el: this.wrapper.querySelector('.drawn_text__balls'),
      rows: 3,
      column: 10,
      reducedRow: 0,
      offsetLeft: [5, 15, 0],
      margin: [7, 5],
      radius: 2,
      center: .333,
      color: '#fff'
    });
    return this.show();
  }

  show () {
    return new TimelineMax({ onComplete: () => { this.titleBalls.options.el && this.titleBalls.play(true); } }).set(this.wrapper, { className: '+=animate' })
      .staggerFromTo(this.toLeft ? this.chars.reverse() : this.chars, this.options.speed || .5, {
          x: this.reducedX,
          opacity: 0
        },
        {
          delay: this.delay,
          x: 0,
          opacity: 1
        }, this.staggerDelay);
  }
};

window.DrawnText = DrawnText;

[...document.querySelectorAll('.drawn_text.drawn_text--small')].forEach((el) => {
  TweenToScroll({
    trigger: el.closest('section'),
    tl: function () {
      return new DrawnText({
        title: el,
        reducedX: -5
      });
    }
  });
});
let splitTitles = [...document.querySelectorAll('.title--js')];
window.addEventListener('orientationchange', () => {
  splitTitles.forEach((el) => {
    el.scene.progress(1).destroy();
    el.splitText.revert();
  });
});
splitTitles.forEach((el) => {
  TweenToScroll({
    trigger: el,
    delayedCall: 1,
    tl: function () {

      el.splitText = new SplitText(el, { type: 'lines' });
      return new TimelineMax().staggerFromTo(el.splitText.lines, 1, { y: -40, opacity: 0 }, {
        opacity: 1,
        y: 0,
        ease: Power3.easeOut
      }, .2);
    }
  });
});

[...document.querySelectorAll('.mad_title, .editor h2')].forEach(el => {
  if (!el.querySelector('.mad_title__balls')) {
    const newBalls = document.createElement('div');
    newBalls.setAttribute('class', 'mad_title__balls');
    el.appendChild(newBalls);
  }

  const ballsContainer = el.querySelector('.mad_title__balls');
  let titleBalls;

  if (ballsContainer.classList.contains('mad_title__balls--many')) {
    titleBalls = new MadParticles({
      el: ballsContainer,
      rows: 6,
      offsetLeft: [0, 35, 80, 30, -30, 75],
      margin: [10, 10],
      center: .6,
      autoPlaySpeed: 3000
    });
  } else {
    titleBalls = new MadParticles({
      el: ballsContainer,
      rows: 2,
      offsetLeft: [0, 55],
      margin: [10, 10],
      center: .4
    });
  }

  TweenToScroll({
    selector: el,
    trigger: el,
    tl: function () {
      return new TimelineMax().from(el, .8, {
        opacity: 0,
        y: -20,
        ease: Power3.easeOut,
        onComplete: () => titleBalls.play(true)
      });
    }
  });
});

