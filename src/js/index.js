'use strict';

/**
 * App entry point.
 *
 * @module App
 */

/** Import initialized-by-default modules/libs */
import './components/common';
import './components/publicAPI';
import 'slick-carousel';
import './components/scrollbar';

/** Import page controllers */
import Home from './pages/home';
import Monetization from './pages/monetization';
import About from './pages/about';

/** Import utils */
import { currentPage } from './modules/dev/helpers';
import './components/polyfills';
import './components/animations/mad-particles';
import './components/preloader';

import './modules/dep/jquery.fancybox';
import './components/object-fit-polyfill';
import './modules/dep/DrawSVGPlugin';
import 'mediaelement';

import './components/animations/circle-play';
import './components/custom-select';
import './components/modal';
import './components/carousels';

import './components/fullscreen';
import './components/animations/scroll-animations';

// section animations
import './components/header';
import './components/animations/sections/main_screen';
import './components/animations/sections/about_us';
import './components/animations/sections/coverage';
import './components/animations/sections/level_up';
import './components/animations/sections/video_nav';
import './components/animations/sections/clients_progress';
import './components/animations/sections/clients';
import './components/animations/sections/events';
import './components/animations/sections/director';
import './components/animations/sections/advantages';
import './components/animations/sections/contact-form';
import './components/animations/sections/not-found';
import './components/animations/sections/team';

import './components/animations/sections/sum_first_screen';

import './components/videos-controller';

import './components/animations/rect-button';
import './components/animations/draw-title';
import './components/contact-map';

import './components/mad-button';
import './components/anchors';
import './components/video-el-hover';
import './components/slide-toggle';

/**
 * Run appropriate scripts for each page.
 **/
switch (currentPage) {
  /** Home page */
  case 'home': new Home; break;

  /** Monetization page */
  case 'monetization': new Monetization; break;

  /** About page */
  case 'about': new About; break;

  /** No page found */

  // default: console.warn('Undefined page');
}
