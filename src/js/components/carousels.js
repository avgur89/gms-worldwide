import '../modules/dep/slick';
import { isScrolledIntoView } from '../modules/dev/helpers';
import { PreloaderAPI } from './preloader';

// slickDynamic extension for Slick carousel by vereschak@gmail.com
(function ($) {
  $.fn.slickDynamic = function (options, breakpoints) {
    let bs = $.extend({
      maxWidth: 1024
    }, breakpoints);
    let _this = this;
    _this.attr('data-dynamic', 'offslider');
    _this.resize = function () {

      _this.each(function () {
        let $this = $(this);

        if ($(window).width() < bs.maxWidth && !$this.hasClass('slick-slider')) {
          $this.slick(options);
          $this.attr('data-dynamic', 'onslider');
        } else if ($(window).width() >= bs.maxWidth && $this.hasClass('slick-slider')) {
          $this.slick('unslick');
          $this.attr('data-dynamic', 'offslider');
        }
      });
    };
    (function (slider) {
      $(window).on('resize', slider.resize.bind(slider));
    })(_this);
    _this.resize();
    return _this;
  };
})(jQuery);
$(() => {
  const $clientSlider = $('.clients__items');
  $clientSlider.slick({
    slidesToShow: 6,
    slidesToScroll: 2,
    rows: 0,
    arrows: false,
    dots: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          dots: true,
          slidesToShow: 4,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });
  PreloaderAPI.then(() => {
    $clientSlider.slick('slickPlay');
  });

  // $( slider ).slickDynamic( { slick settings }, { extension settings } );
  $('.coverage__items, .association__items').slickDynamic({
    arrows: false,
    dots: true,
    rows: 0,
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: false
  }, {
    maxWidth: 767
  });
  $('.events__items, .articles__items, .cases__items').slickDynamic({
    arrows: false,
    dots: true,
    rows: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    adaptiveHeight: true
  }, {
    maxWidth: 767
  });
});
