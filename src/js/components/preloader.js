import {
  currentPage,
  $body,
  $window
} from '../modules/dev/helpers';

import { MadParticles } from './animations/mad-particles';
import { LogoScale } from './animations/logo-timeline';
import { FullScreen } from './fullscreen';
import { TweenMax, TimelineMax } from 'gsap';
import 'imagesloaded';

class Preloader {
  constructor (options = {}) {
    this.options = options;
    this.$preloader = $('.preloader');

    [
      this.$images,
      this.$logo,
      this.fixedClass
    ] = [
      $('img, .load-bg'),
      this.$preloader.find('.preloader__logo'),
      'overflow-margin'
    ];

    this.loadedCount = 0;
    this.imagesToLoad = this.$images.length + 1;
    this.videoToLoad = this.options.onLoadVideo;
    this.result = { progress: 0 };

    return this.create();
  }

  create () {
    this.setHeight();
    this.setParticles();

    return new Promise((resolve, reject) => {
      if (!this.$preloader.length) {
        reject('Preloader absent');
        return false;
      }

      this.checkScrollbar();

      this.progressTl = new TimelineMax({
        paused: true,
        onStart: () => this.logoClipping.play(),
        onComplete: async () => {
          this.tweenParticles.play(true);
          await this.hideContainer();
          this.endLoad();
          resolve(`${currentPage.toString().split('').map((el, index) => {
            if (index === 0) {
              return el.toUpperCase();
            } else return el;
          }).join('')} images loaded`);
        }
      }).to(this.result, 1, { progress: 100 });
      this.awaitMedia();
    });
  }

  awaitMedia () {
    if ((this.$images.length && this.options.waitImages) || this.videoToLoad) {

      const iterationStep = () => {
        this.loadedCount++;
        const loadingProgress = this.loadedCount / this.imagesToLoad;
        this.progressUpdate(loadingProgress);
      };

      iterationStep();

      if (this.videoToLoad) {
        this.imagesToLoad += this.videoToLoad.length;
        this.onLoadVideo.forEach((el) => {
          if (el.readyState !== 4) {
            el.addEventListener('loadeddata', iterationStep);
          } else iterationStep();
        });
      }

      this.$images
        .imagesLoaded({ background: true })
        .progress(iterationStep)
        .on('fail', () => { this.progressUpdate(1) || console.log('FAIL - all images loaded, at least one is broken'); });

    } else this.progressUpdate(1);
  }

  checkScrollbar () {
    $body.removeClass('page_lock');
    const width1 = $window.width();
    $body.addClass(this.fixedClass);
    const width2 = $window.width();

    $(`<style type='text/css'>.${this.fixedClass} {margin-right:${(width2 - width1)}px;}</style>`).appendTo('head');
  }

  setHeight () {
    this.fullScreenAPI = new FullScreen({
      selectors: this.$preloader.get(0)
    });
  }

  progressUpdate (loadingProgress) {
    TweenMax.to(this.progressTl, .5, { progress: loadingProgress });
  }

  async hideContainer () {
    await this.tweenParticles.stop();
    this.tweenParticles = null;
    return new Promise(resolve => {
      this.logoClipping.reverse(() => {
        // hide preloader and show body
        TweenMax.to(this.$preloader, .4, {
          opacity: 0, ease: Power1.easeIn,
          onComplete: resolve
        });
      });
    });
  };

  setParticles () {
    this.logoClipping = new LogoScale({
      logo: this.$logo.get(0),
      reverse: false,
      delay: .3,
      paused: true
    });

    if (this.options.particles) this.tweenParticles = new MadParticles({
      el: this.options.particles,
      autoPlaySpeed: 500,
      resize: false
    });
  }

  endLoad () {
    // unbind resize preloader
    this.fullScreenAPI.destroy();

    // remove classes to block
    this.$preloader.addClass('is_hidden');
    $body.addClass('page_loaded');
    $(`.${this.fixedClass}`).removeClass(this.fixedClass);
  };
}

export const PreloaderAPI = new Preloader({
  waitImages: true,
  particles: document.querySelector('.preloader__balls')
});

PreloaderAPI
  .then(message => console.log(message))
  .catch(() => console.warn('Rejected: ' + error));

