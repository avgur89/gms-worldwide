/**
 * Monetization page scripts.
 *
 * @module Monetization
 */

/** Import utils */
import { Resp } from 'js/modules/dev/helpers';

export default class Monetization {
  /**
   * Cache data, make preparations and initialize page scripts.
   */
  constructor() {
    // Cache data, make preparations etc.
    this.$learnMore = $('.learn_more');
    this.$showMore = $('.show_more');
    this.$hideStage = $('.hide_stage');
    this.$stages = $('.stages__stage');
    // Initialize page scripts
    this.init();
  }

  /**
   * Hide all stages and show current stage
   */
  showStage() {
    if (this.$stages.hasClass('active_stage')) {
      const $parent = $('.active_stage');
      const $el = $parent.find('.stages__stage-wrapper');
      const elHeight = $el.prop('scrollHeight');

      $parent.find('.learn_more').hide();
      $parent.find('.show_more').fadeIn(600);
      $parent.find('.hide_stage').fadeIn(600);

      $parent.find('.show_more').on('click tap', function(e) {
        e.preventDefault();
        $el.css('height', elHeight + 'px');
        $el.addClass('is-active');
        $(this).hide();
      });
    }

    this.$learnMore.on('click tap', function(e) {
      e.preventDefault();
      const $parent = $(this).closest('.stages__stage');
      const $el = $parent.find('.stages__stage-wrapper');
      const elHeight = $el.prop('scrollHeight');

      $('html, body').animate({
        scrollTop: $parent.offset().top - 100
      }, 200);

      setTimeout(function () {
        $el.css('height', elHeight + 'px');
        $el.addClass('is-active');
      }, 400);

      // if (Resp.isMobile) {
      //   $('.stages__stage-wrapper').css('height', '216');
      // } else {
      //   $('.stages__stage-wrapper').css('height', '260');
      // }

      // $('.show_more').hide();
      // $('.hide_stage').hide();
      // $('.learn_more').show();

      // $el.css('height', elHeight + 'px');
      // $('.stages__stage-wrapper').removeClass('is-active');
      // $el.addClass('is-active');

      // setTimeout(function () {
      //   $('html, body').animate({
      //     scrollTop: $parent.offset().top - 100
      //   }, 100);
      // }, 600);

      $(this).hide();
      $parent.find('.hide_stage').fadeIn(600);
    });
  };

  /**
   * Hide current stage
   */
  hideStage() {
    this.$hideStage.on('click tap', function(e) {
      e.preventDefault();
      const $parent = $(this).closest('.stages__stage');
      const $el = $(this).closest('.stages__stage').find('.stages__stage-wrapper');

      $('html, body').animate({
        scrollTop: $parent.offset().top - 100
      }, 200);

      setTimeout(function () {
        if (Resp.isMobile) {
          $el.css('height', '216');
        } else {
          $el.css('height', '260');
        }

        $parent.removeClass('.active_stage');
        $el.removeClass('is-active');
      }, 400);

      $(this).hide();
      $parent.find('.show_more').hide();
      $parent.find('.learn_more').fadeIn(600);
    });
  };

  /**
   * Initialize Home page scripts.
   */
  init() {
    this.showStage();
    this.hideStage();
  }
}
