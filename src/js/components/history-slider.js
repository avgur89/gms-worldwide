export default class HistorySlider {
  constructor ({ navSlider, contentSlider }) {
    this.$navSlider = $(navSlider);
    this.$contentSlider = $(contentSlider);
    return this.init();
  }

  init () {
    const arrows = [this.$navSlider.data('arrow-prev') || 'back', this.$navSlider.data('arrow-next') || 'forward'];

    this.$navSlider
      .slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        rows: 0,
        draggable: false,
        swipe: false,
        arrows: true,
        dots: false,
        focusOnSelect: true,
        asNavFor: this.$contentSlider,
        prevArrow: `<button class="slick-prev">${arrows[0]}</button>`,
        nextArrow: `<button class="slick-next">${arrows[1]}</button>`,
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              variableWidth: true,
              arrows: false,
              swipe: true,
              draggable: true
            }
          }
        ]
      });

    this.$contentSlider
      .slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        draggable: false,
        swipe: false,
        fade: true,
        adaptiveHeight: true,
        rows: 0,
        arrows: false,
        dots: false,
        asNavFor: this.$navSlider
      });

    return this;
  }
}

