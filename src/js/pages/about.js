import HistorySlider from '../components/history-slider';

export default class About {
  constructor () {
    this.createHistorySliders();
  }

  createHistorySliders () {
    [...document.querySelectorAll('.history')].forEach(el => {
      new HistorySlider({
        navSlider: el.querySelector('.history__nav'),
        contentSlider: el.querySelector('.history__content')
      });
    });
  }
};
