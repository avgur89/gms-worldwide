[...document.querySelectorAll('.contact_map')].forEach(el => {
  const select = el.querySelector('.contact_map__select select');
  const listElements = [...el.querySelectorAll('.contact_map__select li')];
  const $slider = $(el.querySelector('.contact_map__slider'));
  const $description = $(el.querySelector('.contact_form__descriptions'));
  const options = [...select.options];

  let changeCallback = () => {
    $slider.slick('slickGoTo', select.selectedIndex);
    $description.slick('slickGoTo', select.selectedIndex);
  };

  listElements.forEach((li, index) => {
    li.addEventListener('click', () => {
      options[index].selected = true;
      changeCallback(index);
    });
  });

  select.addEventListener('change', changeCallback);

  function setSlider(container) {
    container.slick({
      fade: true,
      rows: 0,
      draggable: false,
      swipe: false,
      arrows: false,
      dots: false
    });
  }

  setSlider($description);
  setSlider($slider);
  $slider.on('beforeChange', (slick, event, current, next) => {
    listElements[next].classList.add('active');
    $(listElements[next]).siblings().removeClass('active');
  });
});
