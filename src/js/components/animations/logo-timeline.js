export class LogoScale {
  constructor (options) {
    this.options = options;
    this.logo = options.logo;
    if (!this.logo) return;
    this.clipPath = [...this.logo.querySelectorAll('defs .circle')];
    return this.setTween();
  }
  reverse (callback) {
    TweenMax.staggerTo(this.clipPath, .5, {
      scale: 0,
      transformOrigin: '50% 50%',
      ease: Power2.easeIn,
      onComplete: () => callback && typeof callback === 'function' && callback()
    }, .1);
  }
  setTween () {
    TweenMax.set(this.clipPath, {
      scale: 0,
      transformOrigin: '50% 50%',
      onComplete: () => this.logo.classList.add('is-ready')
    });
    this.tl = new TimelineMax({
      paused: this.options.paused,
      delay: this.options.delay || 0, onComplete: () => {
        let callback = this.options.callback;
        if (callback && typeof callback === 'function') callback();
      }
    }).staggerTo(this.clipPath, .4, { scale: 1, transformOrigin: '50% 50%', ease: Power3.easeOut }, .13);

    return this;
  }
  play () {
    this.tl.play();
  }
}
