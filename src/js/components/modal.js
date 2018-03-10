// $('video, audio').mediaelementplayer();
import 'gsap/src/uncompressed/plugins/ScrollToPlugin';
import { ConvexParticles } from './animations/convex-particles';
import { HeaderAPI } from './header';
import { scrollController } from './animations/scroll-animations';

class InlineForm {
  constructor (options) {
    this.$section = $(options.section);
    this.$close = this.$section.find('.action__close');
    this.$dropdown = this.$section.find('.action__dropdown');
    this.setCanvasHeight();
    this.bindOpen();
  }

  setCanvasHeight () {
    this.canvas = document.querySelector('.action__convex_particles');

    this.particles = new ConvexParticles({
      offset: [-23, 0],
      margin: [70, 90],
      container: this.canvas,
      strength: 0.5,
      color: '0x70c58c'
    });
  }

  close () {
    const dropdown = this.$section.find('.action__dropdown')[0];
    if (this.$section.hasClass('opened')) {
      TweenMax.to(dropdown, .6, {
        height: 0,
        ease: Power2.easeOut,
        onComplete: () => {
          this.canvas.style.height = this.$section.height() + 'px';

          this.particles.resize();
        }
      });
      setTimeout(() => {
        this.$section.removeClass('opened');
      }, 100);
    }
  }

  open (anchor) {
    if (this.$section.hasClass('opened')) return;

    this.canvas.style.height = this.$dropdown[0].scrollHeight + this.$section.height() + 'px';
    const offset = this.$section.offset().top;
    let scrollHeight = this.$dropdown[0].scrollHeight;

    if (this.particles.resize()) {
      this.particles.app.start();
    }
    this.$section.addClass('opened');
    HeaderAPI.physicalScrolling = false;
    TweenMax.to(this.$dropdown, .6, {
      height: scrollHeight,
      ease: Power2.easeOut,
      onComplete: () => {
        TweenMax.set(this.$dropdown, {
          height: 'auto'
        });
      }
    });
    if (anchor) window.animateScroll({
      offset: offset - 40,
      duration: 600,
      delay: 100
    });
  }

  success () {
    this.close();
    this.$section.addClass('action--thanks');
    setTimeout(() => {
      this.$section.removeClass('action--thanks');
    }, 3000);
  }

  bindOpen () {
    this.$section.on('click', () => {
      this.open(true);
    });

    this.$close.on('click', () => {
      this.close();
    });
  }
};
$(() => {
  $('.action').each((index, el) => {
    el.inlineForm = new InlineForm({
      section: el
    });
  });
});
$('.team__item a').fancybox({
  btnTpl: {
    smallBtn: '<button data-fancybox-close title="{{CLOSE}}"><svg class="icon-close-ico"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close-ico"></use></svg></button>'
  }
});