import { debounce, Resp } from '../modules/dev/helpers';

export class FullScreen {
  constructor (options) {
    if (!options.selectors) return this;

    this.selectors = !Array.isArray(options.selectors) ? [options.selectors] : options.selectors || document.querySelectorAll('.fullscreen');

    if (this.selectors && this.selectors.length) {
      this.getFullHeight();
      this.bind();
      this.changeStyle(`${this.viewportHeight}px`);
    } else return this;
  }

  badRatio (element) {
    const content = element.querySelector('.fullscreen__content');
    if (content && $(content).outerHeight(true) > this.viewportHeight) {
      return false;
    } else {
      return true;
    }
  }

  getFullHeight () {
    let height = window.innerHeight;
    let width = window.innerWidth;

    if (!Resp.isMobile || this.oldWidth !== width) {
      this.viewportHeight = height;
      this.oldWidth = width;
      return true;
    } else {
      return false;
    }
  }

  changeStyle (value) {
    this.selectors.forEach(el => {
      if (this.badRatio(el)) {
        el.style.height = value;
      } else {
        el.style.height = 'auto';
      }
    });
  }

  bind () {
    window.addEventListener('resize', debounce(() => {
      if (this.getFullHeight()) this.changeStyle(`${this.viewportHeight}px`);
    }, this, 100));
  }

  unbind () {
    window.removeEventListener('resize', debounce(() => {
      if (this.getFullHeight()) this.changeStyle(`${this.viewportHeight}px`);
    }, this, 100));
  }

  destroy () {
    this.unbind();
    this.changeStyle('auto');
  }
}

new FullScreen({
  selectors: [...document.querySelectorAll('.fullscreen')]
});
