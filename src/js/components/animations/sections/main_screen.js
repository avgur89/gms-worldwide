import { LogoScale } from '../logo-timeline';
import { MadParticles } from '../mad-particles';
import { TweenToScroll } from '../scroll-animations';
import { $window } from '../../../modules/dev/helpers';

const checkFirstScreen = () => {
  const $wrapper = $('.main_screen__content');
  const $content = $('.main_screen__center');
  let screenHeight = $window.height();
  if ($content.outerHeight(true) > $window.height()) {
    $wrapper.height('auto');
  } else {
    $wrapper.height(screenHeight);
  }
};

$window.on('resize', checkFirstScreen);
$(checkFirstScreen);

const mainBalls = new MadParticles({
  el: document.querySelector('.main_screen__balls'),
  rows: 6,
  offsetLeft: [0, 35, 80, 30, -30, 75],
  margin: [10, 10],
  autoPlaySpeed: 3000
});
let headerLogo = [...document.querySelectorAll('.header__logo svg')];
headerLogo.forEach(el => {
  TweenToScroll({
    trigger: el,
    triggerHook: 1,
    tl: function () {
      return new LogoScale({ logo: el, delay: 0 }).tl;
    }
  });
});

let header = [...document.querySelectorAll('.header, .footer')];
header.forEach(el => {
  let navElements = [...el.querySelectorAll('.header__nav li, .header__lang_select, .footer__nav li, .footer__copyright, .header__toggle')];
  TweenToScroll({
    trigger: el,
    triggerHook: 1,
    tl: function () {
      return new TimelineMax({ delay: .4 })
        .staggerFromTo(navElements, .5, {
          opacity: 0,
          cycle: {
            x: function (index, el) {
              if ($(el).hasClass('.footer__copyright')) return 0;
              return -60;
            }
          }
        }, {
          x: 0,
          opacity: 1
        }, .025, '-=.6');

    }
  });
});

let video = document.querySelector('.main_screen .video_container');
let viewportWidth = -window.innerWidth / 7 | 0;
TweenToScroll({
  trigger: document.querySelector('.main_screen'),
  tl: function () {
    return new TimelineMax()
      .fromTo(document.querySelector('.main_screen .video_background__fill'), .8, {
        opacity: 1

      }, {
        opacity: 0
      }, '+=.1')
      .fromTo(video, 1.2, { x: viewportWidth, y: viewportWidth }, { x: 0, y: 0, ease: Power3.easeOut }, '-=.8')
      .fromTo(document.querySelector('.main_screen h2'), .8, { opacity: 0, x: -60 }, {
        opacity: 1,
        x: 0,
        ease: Power4.easeOut
      }, '-=.3');
  }
});
let circlePlay = document.querySelector('.main_screen .circle_play--js');
TweenToScroll({
  trigger: document.querySelector('.main_screen'),
  tl: function () {
    return circlePlay.circlePlay.show(.9).fromTo('.main_screen .choose', .5, { opacity: 0, x: -50 }, {
      opacity: 1, x: 0, ease: Power3.easeOut, onComplete: () => {
        mainBalls.play(true);
      }
    }, '-=.6');
  }
});

