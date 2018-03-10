import { TweenMax } from 'gsap';
import { isScrolledIntoView, debounce } from '../../modules/dev/helpers';
import '../../modules/dep/CustomEase';

export class MadParticles {
  constructor (options) {
    this.options = Object.assign({
      column: 20,
      rows: 4,
      reducedRow: 3,
      radius: 3,
      offsetLeft: [0, 35, -8],
      margin: [12, 12],
      color: '#3db565',
      autoPlay: false,
      autoPlaySpeed: 1000,
      center: .5,
      delay: 0,
      resize: false
    }, options);

    return this.createCanvas();
  }

  createCanvas () {
    if (!this.options.el) return false;

    this.options.color = this.options.el.dataset.color || this.options.color;
    this.options.rows = +this.options.el.dataset.rows || this.options.rows;

    this.options.el.classList.add('mad-particles');
    let canvas = (this.canvas = document.createElement('canvas'));
    this.ctx = this.canvas.getContext('2d');
    this.setStyles();
    this.options.el.appendChild(canvas);
    this.bindResize();
    this.renderBalls();
    this.setTween();
    if (this.options.autoPlay) this.play(this.options.autoPlay);
  }

  setStyles () {
    this.canvas.width = this.width = this.options.el.offsetWidth;
    this.canvas.height = this.height = this.options.el.offsetHeight;
    let center = this.width * this.options.center;
    this.endValues = {
      radius: this.options.radius,
      offsetCenter: -(this.options.column * this.options.margin[1]) / 2,
      marginHorizontal: this.options.margin[1]
    };

    const getObj = (scene) => {
      let offsetCenter = scene ? 0 : 50;

      let space =
        center / this.options.column > this.options.margin[1] * 1.8
          ? center / this.options.column
          : this.options.margin[1] * 2;
      space *= 1.2;
      let largeSpace = space * 1.2;
      if (scene === 1) {
        space = largeSpace = this.options.margin[1];
      }
      return {
        offsetCenter,
        smallRadius: 0,
        secondRadius: 0,
        radius: 0,
        center,
        space,
        largeSpace
      };
    };

    this.inParams = [getObj(0), getObj(1)];

    this.outParams = getObj(0);

    this.renderBalls();
  }
  resize() {
    if (this.options.resize) {
      this.setStyles();
      this.renderBalls();
      this.setTween();
    }
  }
  bindResize() {
    window.addEventListener('resize', debounce(() => this.resize(), 100, this));
  }
  unbindResize() {
    window.removeEventListener('resize', debounce(() => this.resize(), 100, this));
  }
  destroy() {
    this.unbindResize();
  }
  renderBalls () {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    let middle = this.height / 2;

    let offsetTop = middle - (this.options.rows + 1) * this.options.margin[0] / 2;
    for (let row = 1; row < this.options.rows + 1; row++) {
      for (let col = 1; col < this.options.column + 1; col++) {
        const localValues = function (indexObject) {
          const obj = this.inParams[indexObject];
          let radius = obj.radius;
          let center = obj.center - obj.offsetCenter;

          let localSpace;

          localSpace = obj.space;

          let newCenter = center - (this.options.offsetLeft[row - 1] || 0) + Math.max.apply(null, this.options.offsetLeft);

          if (row === this.options.reducedRow) {
            if (indexObject === 0) localSpace = obj.largeSpace + 1;
            radius = obj.smallRadius;
          }

          let x;
          if (indexObject === 0) {
            x = (newCenter || center) - localSpace * col;
          } else {
            x = (newCenter || center) - (this.options.column * this.options.margin[1]) / 1.4 + localSpace * col;
          }

          let y = offsetTop + this.options.margin[0] * row;

          return { x, y, radius };
        }.bind(this);

        const drawBalls = (sceneValues) => {
          ctx.beginPath();
          ctx.arc(sceneValues.x, sceneValues.y, sceneValues.radius, Math.PI * 2, false);
          ctx.fillStyle = this.options.color;
          ctx.fill();
        };

        if (this.leave) {
          drawBalls(localValues(1));
        }
        drawBalls(localValues(0));
      }
    }
  }

  setTween () {
    this.tl = new TimelineMax({
      paused: true,
      delay: this.options.delay,
      onComplete: () => {
        this.setStyles();
        this.setTween();
        this.leave = false;
      },
      onUpdate: () => {
        this.renderBalls();
      }
    }).to(this.inParams[0], 0.3, {
      radius: this.endValues.radius
    }).to(this.inParams[0], 0.3, { smallRadius: this.endValues.radius }, '-=.2').to(this.inParams[0], 1.5, {
      offsetCenter: this.endValues.offsetCenter,
      space: this.endValues.marginHorizontal,
      largeSpace: this.endValues.marginHorizontal,
      ease: CustomEase.create('custom', 'M0,0 C0.11,0.494 0.142,0.696 0.268,0.822 0.4,0.954 0.504,1 1,1')
    }, '-=.3').to(this.inParams[1], .3, {
      radius: this.options.radius,
      smallRadius: this.options.radius,
      onStart: () => {
        this.leave = true;
      }
    }, '-=1').to(this.inParams[0], 0.4, { radius: this.outParams.radius, smallRadius: this.outParams.radius }, '-=.8').to(this.inParams[1], 1.4, {
      space: this.outParams.space * 4,
      smallRadius: this.outParams.smallRadius,
      largeSpace: this.outParams.space + 5,
      ease: Power3.easeIn
    }, '-=1.4').to(this.inParams[1], .4, { smallRadius: 0 }, '-=.3').to(this.inParams[1], .3, { radius: 0 }, '-=.5');
  }
  play (loop, isPromise) {
    if (isPromise && this.options.stop) return false;
    this.animPromise = this.playPromise();
    this.animPromise.then(() => {

      if (loop) {
        this.options.autoPlay = true;
      }

      if (this.options.autoPlay) {
        setTimeout(() => this.play.call(this, loop, true), this.options.autoPlaySpeed);
      }
    });
    return this.animPromise;
  }
  playPromise () {
    return new Promise((resolve) => {
      if (isScrolledIntoView($(this.options.el))) this.tl.play();
      setTimeout(() => resolve(), this.tl.totalDuration() * 1000);
    });
  }
  stop () {
    this.options.stop = true;
    return this.animPromise;
  }
}
