// Created by vereschak@gmail.com
import 'pixi.js';
import { BulgePinchFilter } from '@pixi/filter-bulge-pinch';
import { debounce, Resp } from '../../modules/dev/helpers';

export class ConvexParticles {
  constructor (params) {
    this.params = params;
    this.dom = params.container;
    if (!this.dom) return;

    this.offset = this.dom.getAttribute('class').indexOf('--full') !== -1 ? [-(this.params.margin[0] / 2), 0] : (this.params.offset || [0, 0]);
    this.section = this.dom.closest('section');
    this.dots = {};
    if (!Resp.isMobile) {
      this.init();
    }
    window.addEventListener('resize', debounce(() => this.resize(), 300, this));

  }

  init () {

    this.initApplication();
    this.dom.appendChild(this.app.view);

    if (this.resize()) {
      this.createFilter();
    }
  }

  initApplication () {
    this.app = new PIXI.Application({
      transparent: true,
      antialias: true,
      resolution: 1
    });
  }

  destroy () {
    this.unbind();
    this.dom.removeChild(this.app.view);
    this.app = null;
  }

  unbind () {
    $(this.section)
      .off('mouseenter.convex')
      .off('mousemove.convex')
      .off('mouseleave.convex');
  }

  resize () {
    if (Resp.isMobile) {
      if (this.app && this.app.stage) this.destroy();
      return false;
    } else if (!this.app) {
      this.init();
      return false;
    }

    let width = this.width = this.dom.offsetWidth;
    let height = this.height = this.dom.offsetHeight;

    this.app.renderer.resize(width, height);
    this.createParticles();

    return true;
  }

  createParticles () {
    let radius = 3;
    let offset = this.offset;
    let margin = this.params.margin;
    let stage = this.app.stage;
    let width = this.width;
    let height = this.height;

    let columns = Math.round(width / margin[1]);
    let rows = Math.round((height - offset[0]) / margin[0]);
    if (this.dots.clear !== undefined) this.dots.clear();
    let graphics = (this.dots = new PIXI.Graphics());

    graphics.beginFill(0, 0);
    graphics.drawCircle(0, 0, radius);
    graphics.drawCircle(width, height, radius);
    graphics.endFill();

    for (let i = 0; i < columns; i++) {
      for (let r = 0; r < rows; r++) {
        graphics.beginFill(this.params.color);
        graphics.drawCircle(margin[1] * (i + 1), offset[0] + margin[0] * (r + 1), radius);
        graphics.endFill();
      }
    }
    stage.addChild(graphics);
    this.app.stop();
    this.app.render();
  }

  createFilter () {
    let stage = this.app.stage;
    this.filter = new PIXI.filters.BulgePinchFilter([0, 0], 150, 0.001);
    stage.filters = [this.filter];

    $(this.section).on('mousemove.convex', e => {
      let bound = this.section.getBoundingClientRect();
      let width = bound.width;
      let height = bound.height;

      let top = e.clientY - bound.top;
      let left = e.clientX - bound.left;

      let x = left / width;
      let y = top / height;

      this.filter.center = [x, y];

    });

    this.scaleFilter();
  }

  scaleFilter () {
    let obj = { scale: 0 };
    const scaling = (s, stop) => {
      TweenLite.to(obj, 0.4, {
        scale: s,
        onUpdate: () => {
          this.filter.strength = obj.scale;
        },
        onComplete: () => {
          if (stop) this.app.stop();
        }
      });
    };
    $(this.section).on('mouseleave.convex', () => {
      scaling(0.0001, true);
    });
    $(this.section).on('mouseenter.convex', () => {
      this.app.start();
      scaling(this.params.strength);
    });
  }
}

(function (ELEMENT) {
  ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
  ELEMENT.closest = ELEMENT.closest || function closest (selector) {
    if (!this) return null;
    if (this.matches(selector)) return this;
    if (!this.parentElement) {return null;} else return this.parentElement.closest(selector);
  };
}(Element.prototype));
