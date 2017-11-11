/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
(function() {
    'use strict';
    angular
      .module('app')
      .run(runBlock)
      .config(config);

      runBlock.$inject = ['$rootScope', '$state', '$stateParams'];
      function runBlock($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }

      config.$inject =  ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG' ,'$httpProvider' , '$provide'];
      function config( $stateProvider,   $urlRouterProvider,   MODULE_CONFIG,$httpProvider, $provide ) {

        function load(srcs, callback) {
          return {
            deps: ['$ocLazyLoad', '$q','$location',
              function( $ocLazyLoad, $q , $location){
                var deferred = $q.defer();


                var promise  = false;
                srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                if(!promise){
                  promise = deferred.promise;
                }
                angular.forEach(srcs, function(src) {
                  promise = promise.then( function(){
                    angular.forEach(MODULE_CONFIG, function(module) {
                      if( module.name == src){
                        src = module.module ? module.name : module.files;
                      }
                    });
                    return $ocLazyLoad.load(src);
                  } );
                });
                deferred.resolve();
                return callback ? promise.then(function(){ return callback(); }) : promise;
              }]
          }
        }
        

        var layout = 'views/layout/layout.html';

        $urlRouterProvider
          .otherwise('/app/game');
        $stateProvider
          .state('app', {
            abstract: true,
            url: '/app',
            views: {
              '': {
                templateUrl: layout
              }
            }
          })
            .state('app.game', {
              url: '/game',
              templateUrl: 'views/page/game.html',
              data : { title: 'Game Card' },
              controller: "GameCtrl",
              resolve: load(['scripts/controllers/game.js'])
            })
          ;

        function getParams(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

      }
})();
