import { PreloaderAPI } from '../preloader';
import ScrollMagic from 'scrollmagic';
import 'animation.gsap';

class ScrollAnimation extends ScrollMagic.Controller {

  constructor (options) {
    super();
    this.option = options;
  };

  add (target, tl, triggerHook) {
    let scene = new ScrollMagic.Scene({
      triggerElement: target,
      reverse: false,
      triggerHook: triggerHook || .8
    });
    target.scene = scene;
    scene.setTween(tl);
    PreloaderAPI.then(() => {
      scene.addTo(this);
    }, error => {
      console.warn(error);
      scene.addTo(this);
    });
  }
}

export const scrollController = new ScrollAnimation();
export const TweenToScroll = (obj) => {
  $(() => {
    if (!obj.trigger) { return; } else if (!$(obj.trigger).is(':visible')) return;

    if (obj.delayedCall) { // waiting for load fonts
      TweenMax.delayedCall(1, setTween);

      function setTween() {
        scrollController.add(obj.trigger, obj.tl(), obj.triggerHook);
      }
    } else scrollController.add(obj.trigger, obj.tl(), obj.triggerHook);

  });
};

