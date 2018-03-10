import { TweenToScroll } from '../scroll-animations';

let wrapper = document.querySelector('.coverage__items');

if (wrapper) {
  let items = [...wrapper.querySelectorAll('.coverage__item .fade_wrap')];
  TweenToScroll({
    trigger: wrapper,
    tl: function () {
      return new TimelineMax({})
        .staggerFromTo(items, .8, {
          x: -60,
          opacity: 0
        }, {
          x: 0,
          opacity: 1,
          ease: Expo.easeOut
        }, .04);
    }
  });
}

