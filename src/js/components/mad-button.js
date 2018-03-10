import { getRandomInt } from '../modules/dev/helpers';

class MadButton {
  constructor (options) {
    this.options = options;
    this.particles = [];
    this.randoms = [];
    this.tick = 0;
    this.playing = false;
    this.createCanvas();
  }

  createCanvas () {
    let canvas = (this.canvas = document.createElement('canvas'));
    this.ctx = this.canvas.getContext('2d');
    this.options.el.classList.add('mad-button');
    this.options.el.appendChild(canvas);
    this.setStyles();
    this.createParticles();
    this.bindResize();
    this.eventBind();
  }

  setRandomOffset () {
    this.randoms = [];
    for (let i = 0; i < this.rows; i++) {
      this.randoms.push(getRandomInt(-10, 10));
    }
  }

  createParticles () {
    for (let i = 0; i < this.columns; i++) {
      this.particles.push({
        x: i * this.columnsMargin
      });
    }
  }

  stop () {
    this.playing = false;
    cancelAnimationFrame(this.request);
  }

  play () {
    if (!this.playing) {
      this.playing = true;
      this.loop();
    }
  }

  loop () {
    let _this = this;

    if (this.playing) {
      this.updateParticles();
      this.killParticles();
      this.renderBalls();
      this.request = requestAnimationFrame(_this.loop.bind(_this));
    }
  }

  static addListenerMulti = (el, s, fn) => {
    s.split(' ').forEach(e => el.addEventListener(e, fn, false));
  };

  eventBind () {
    let _this = this;
    MadButton.addListenerMulti(this.options.el, 'mouseenter', () => {
      this.setRandomOffset();
      this.play.call(_this);
    });
    MadButton.addListenerMulti(this.options.el, 'mouseleave', _this.stop.bind(_this));
    document.addEventListener('click', e => {
      if (!e.target.closest('.mad-button')) _this.stop.call(_this);
    });
  };

  setStyles () {
    let width = (this.canvas.width = this.width = this.canvas.offsetWidth);
    let height = (this.canvas.height = this.height = this.canvas.offsetHeight);
    this.columnsMargin = width / this.options.columns;
    this.rowsMargin = (height / this.options.rows) | 0;
    this.columns = Math.floor(width / this.columnsMargin);
    this.rows = (height / this.rowsMargin) | 0;
    this.offset = 3;
  }

  resize () {
    this.setStyles();
  }

  bindResize () {
    window.addEventListener('resize', this.resize.bind(this));
  }

  unbindResize () {
    window.removeEventListener('resize', this.resize.bind(this));
  }

  destroy () {
    this.unbindResize();
  }

  updateParticles () {
    for (let i = 0; i < this.particles.length; i++) {
      let part = this.particles[i];
      part.x += this.offset;
    }
  }

  killParticles () {
    for (let i = 0; i < this.particles.length; i++) {
      let part = this.particles[i];
      if (part.x >= this.width) {
        part.x = 0;
      }
    }
  }

  renderBalls () {
    this.playing = true;
    const ctx = this.ctx;
    let radius = this.width / 2;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.beginPath();
    ctx.globalCompositeOperation = 'source-out';

    ctx.arc(radius, radius, radius, Math.PI * 2, false);

    let gradient = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(0.73, 'white');
    try {
      gradient.addColorStop(0.73, 'rgba(255, 255, 255, .6');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0');
    } catch (error) {
      // for IE
      console.error(error.message + ' rgba in addColorStop not support');

      gradient.addColorStop(0.73, 'white');
      gradient.addColorStop(1, 'transparent');
    }
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.globalCompositeOperation = 'source-in';
    for (let row = 0; row < this.rows; row++) {
      for (let part of this.particles) {

        let y = this.rowsMargin * row;
        ctx.moveTo(part.x, y);
        ctx.arc(this.randoms[row] + part.x, y + this.rowsMargin / 2, 2.5, 0, Math.PI * 2);

      }
    }
    ctx.fillStyle = this.options.color;
    ctx.fill();
  }
}

[...document.querySelectorAll('.circle_play')].forEach(el => {
  new MadButton({
    el: el,
    margin: [15, 30],
    color: '#3db565',
    columns: 8,
    rows: 14,
    speed: 3000,
    maxSpace: 2
  });
});

