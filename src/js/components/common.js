/**
 * Website's common scripts.
 *
 * @module Common
 */

export class Common {
  /**
   * Cache data etc.
   */
  constructor() {
    this.$cookiesBtn = $('.cookies_btn');
  }

  /**
   * Hide cookies bar
   */
  hideCookies () {
    this.$cookiesBtn.on('click tap', function (e) {
      e.preventDefault();
      $('.cookies').slideUp(400);
    });
  };

  /**
   * Initialize Main page scripts.
   */
  init() {
    this.hideCookies();
  }
}

/** Export initialized common scripts by default */
export default new Common().init();
