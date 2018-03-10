$(document).on('click', '.js-slide-toggle--link', e => {

  const $link = $(e.target).closest('.js-slide-toggle--link');
  const toggleText = $link.data('toggle-text');
  const currentText = $link.data('current-text');

  e.preventDefault();

  $link.parent().find('.js-slide-toggle--content').slideToggle(300);

  const textContainer = $link.find('a > div');
  const newText = toggleText !== $(textContainer[0]).text() ? toggleText : currentText;
  textContainer.html(newText);

});
