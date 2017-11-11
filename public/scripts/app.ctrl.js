/**
 * @ngdoc function
 * @name app.controller:AppCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */

(function() {
    'use strict';
    angular
      .module('app')
      .controller('AppCtrl', AppCtrl);

      AppCtrl.$inject  = ['$scope', '$localStorage', '$location', '$rootScope', '$timeout', '$window'];

      function AppCtrl($scope, $localStorage, $location, $rootScope, $timeout, $window) {
        var vm = $scope;


        $rootScope.$on('$stateChangeSuccess', openPage);

        function openPage() {
          // goto top
          $location.hash('content');
          $location.hash('');
        };

        vm.goBack = function () {
          $window.history.back();
        };

      }
})();
