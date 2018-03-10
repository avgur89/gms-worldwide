import { $body, $document, $window, css, throttle, debounce, Resp } from '../modules/dev/helpers';

class Header {
  constructor () {
    this.$header = $('.header');
    if (!this.$header.length) return;
    this.burger = document.querySelector('.header__toggle a');
    this.header = document.querySelector('.header');
    this.nav = this.header.querySelector('.header__nav');
    this.links = [...this.nav.querySelectorAll('li')];
    this.bindResize();
    this.coverUp();
    this.bindBurger();
  }

  resize () {
    this.coverUp();

    if (!Resp.isDesk) {
      this.nav.style.height = $window.height() - this.header.offsetHeight + 'px';
    }

    if (this.timeline && Resp.isDesk) {
      this.timeline.kill();
      TweenMax.set([this.nav, this.links], { clearProps: 'all' });
      this.timeline = null;
    } else if (!this.timeline && !Resp.isDesk) this.tweenForOpen();
  }

  bindResize () {
    this.resize();
    $window.on('resize', debounce(() => this.resize(), 100, this));
  }

  tweenForOpen () {
    this.timeline = new TimelineMax({
      paused: true
    });
    this.timeline
      .set(this.header, {
        className: '+=nav-opened'
      })
      .fromTo(this.nav, .3, {
        autoAlpha: 0,
        y: 50
      }, {
        y: 0,
        autoAlpha: 1,
        ease: Power2.easeOut
      })
      .staggerFromTo(this.links, .4, {
        y: 35,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        ease: Power2.easeOut
      }, .05);
  }

  bindBurger () {
    if (!Resp.isDesk) this.tweenForOpen();
    this.burger.addEventListener('click', e => {
      e.preventDefault();
      if ($(this.header).hasClass('nav-opened')) {
        this.timeline.reverse();
      } else {
        this.tweenForOpen();
        this.timeline.play();
      }
    });
  }

  coverUp () {
    let lastScrollTop = 0;
    const $header = this.$header;
    const delta = 10;
    const headerHeight = $header.height();
    const minOffsetTop = $window.height();
    const checkWithThrottle = this.checkWithThrottle = throttle(() => {
      const scrollTop = $window.scrollTop();

      if (Math.abs(lastScrollTop - scrollTop) <= delta) return;

      if (scrollTop <= delta) {
        $header.removeClass(css.white);
      }
      if (scrollTop > lastScrollTop && scrollTop > headerHeight && !this.$header.hasClass(css.menuActive)) {
        $header.addClass(css.white);
        if (scrollTop > minOffsetTop) {
          $header.addClass(css.menuHide);
        }

      } else if (scrollTop + $window.height() < $document.height()) {
        $header.removeClass(css.menuHide);
      }
      lastScrollTop = scrollTop;
    }, 50, this);

    if (this.checkWithThrottle && typeof this.checkWithThrottle === 'function') $window.off('scroll', this.checkWithThrottle);
    this.checkWithThrottle = checkWithThrottle;
    checkWithThrottle();
    $window.on('scroll', this.checkWithThrottle);

    return this;
  }
}

export const HeaderAPI = new Header();

