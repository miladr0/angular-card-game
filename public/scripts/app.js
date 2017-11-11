/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
(function() {
    'use strict';
    angular
      .module('app', [
        'ngStorage',
        'ngStore',
        'ui.router',
        'ui.load',
        'oc.lazyLoad'
      ]);
})();
