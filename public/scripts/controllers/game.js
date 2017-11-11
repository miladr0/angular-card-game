// code style: https://github.com/johnpapa/angular-styleguide 

(function() {
    'use strict';
    angular
      .module('app')
      .controller('GameCtrl', GameCtrl);

    GameCtrl.$inject = ['$http', '$q', '$rootScope', '$scope', '$state', '$localStorage'];
      function GameCtrl($http, $q, $rootScope, $scope, $state, $localStorage){
        let vm = $scope;


          vm.$on('$stateChangeSuccess', function(){
              loadPlayedGames();
          });

          //game key in localStorage
          const gameKey = 'game-deck';
          //all saved games
          vm.allGameData = [];
          let isNewGame = true;
          //number of default player
          vm.totalPlayer = 4;
          let hands = [], players = [] ,cards = [], shuffled = [];
          //some name for sluggish
          var randomNames = [
              {name:'Last Jedi', soccer:0}
              , {name:'Daisy Ridley', soccer:0}
              , {name:'john Legend', soccer:0}
              , {name:'Kevin spacey', soccer:0}
              , {name : 'Mark Hamill', soccer:0}
              , {name : ' Rian Johnson', soccer:0}
              , {name : 'William', soccer:0}
              , {name : 'Ethan', soccer:0}
              , {name : 'Alexander', soccer:0}
              , {name : 'walking Dead', soccer:0} ];
          //chosen suit to add extra soccer
          let mainSuit;
          const suits = ["c", "d", "h", "s"],
              ranks = [{name : "2", value:0},
                        {name : "3", value:0}, {name : "4", value:0}, {name : "5", value:0}
                      , {name : "6", value:0}, {name : "7", value:0}, {name : "8", value:0}
                      , {name : "9", value:0}, {name : "10", value:10}
                      , {name : "11", value:2}, {name : "12", value:3}
                      ,{name : "13", value:4}, {name : "14", value:11}
                  ];




          /*
          display chosen Suit for extra Soccer
           */
          const showWildCard = function (firstCard) {

              mainSuit = firstCard.suit;
              $('#wild-card')
                  .prepend(
                      $('<img>', {src : '../../images/'+ firstCard.suit+firstCard.name + '.svg'})
                  )
          };

          /*
            display card on the Table
             */
          const showCard = function(p,c) {

              $('.player-' + p + ' .playerSoccer')
                  .html(players[p].soccer);

              $('.player-' + p + ' .cards')
                  .append(
                      $('<div>' )
                          .addClass('card suit-' + hands[p][c].suit)
                          .prepend(
                              $('<img>', {src : '../../images/'+ hands[p][c].suit+hands[p][c].name + '.svg'})
                          )
                  )
          };


          /*
          generate all 52 cards
           */
          const deck = function() {
                  _.each(suits, function(suit){
                      _.each(ranks, function(rank){
                          cards.push( {
                              suit: suit,
                              name: rank.name,
                              value: rank.value
                          });
                      });
                  });
              };

          /*
          select winner of round by max soccer
           */
          const selectWinner = function() {
              const maxSoccer = Math.max.apply(Math, players.map(function(obj) {

                  return obj.soccer;
              }));

              vm.winnerSpec = players.find(function (obj) {
                  return obj.soccer === maxSoccer;
              });

          };

          /*
          clean every thing for fresh start
           */
          const init = function() {
              $('.game-deck').html('');
              $('#wild-card').html('');
              cards = [];
              deck();
              initUsersOnDeck();
          };

          /*
          create <div class="player player-"> html for every user using Jquery
           */
          const initUsersOnDeck = function() {
              for (let p in players) {
                  $('.game-deck')
                      .append(
                          $('<div>')
                              .addClass('player player-' + p)
                              .append(
                                  $('<div>')
                                      .addClass('playerName')
                                      .html(players[p].name)
                              )
                              .append(
                                  $('<div>')
                                      .addClass('playerSoccer')
                                      .html('')
                              )
                              .append(
                                  $('<div>')
                                      .addClass('cards')
                              )

                      );
              }
          };

          /*
          deal cards to every user based on : Math.floor((51 / vm.totalPlayer))
           */
          const startDeal = function(shuffling = true) {
              shuffled = shuffleCards(cards, shuffling);
              let card = 0;
              showWildCard(shuffled[card]);
              card++;
              console.log(vm.totalPlayer);
              const totalplayerCards = Math.floor((51 / vm.totalPlayer));
              _.times(totalplayerCards, function(c) {
                  _.times(players.length, function(p) {
                      hands[p].push(shuffled[card]);

                      if(isNewGame) {
                          if(shuffled[card].suit === mainSuit)
                              players[p].soccer += (shuffled[card].value * 2);
                          else
                              players[p].soccer += shuffled[card].value ;
                      }

                      card++;
                      showCard(p,c);
                  });
              });

              selectWinner();//find winner

              if(isNewGame)
                  saveGame(shuffled, players);//save game deck and winner

          };

          /*
          start your little tiny shiny game
           */
          vm.startGame = function () {

              if(vm.totalPlayer != null && vm.totalPlayer != '') {
                  if(typeof vm.totalPlayer === 'number') {
                      if(vm.totalPlayer >= 2 && vm.totalPlayer <= 10) {
                          isNewGame = true;
                          console.log('clicked');
                          var temp = randomNames.slice(0, vm.totalPlayer);
                          players = temp.map(a => Object.assign({}, a));
                          hands = _.range(players.length).map(function () { return [] });
                          init();
                          startDeal();
                      }else {
                          alert('min player is 2, max player is 10');
                      }
                  }else {
                      alert('ops :)(: only numbers is allowed');
                  }

              }else {
                  alert('we need some player');

              }

          };

          /*
          shuffle cards using underScore
           */
          const shuffleCards = function (cards , shuffling = true) {

              if(shuffling)
              return _.shuffle(cards);

              return cards;
          };

          /*
          save Game Deck in localStorage
           */

          const saveGame = function (shuffledCards, players) {

              const currentGameData = {winner: vm.winnerSpec, deck: shuffledCards, players: players};


              if(angular.isDefined($localStorage[gameKey])) {
                   vm.allGameData = $localStorage[gameKey];
                  console.log(vm.allGameData);
                  vm.allGameData.push(currentGameData);
                  $localStorage[gameKey] = vm.allGameData;
              }else {
                  vm.allGameData.push(currentGameData);
                  $localStorage[gameKey] = vm.allGameData;
              }

          };


          /*
          load played games , from localStorage
           */

          const loadPlayedGames = function () {

              if(angular.isDefined($localStorage[gameKey])) {
                  vm.allGameData = $localStorage[gameKey];

              }
          };

          /*
          retrieve a played game
           */
          vm.onRetrievePlayedGame = function () {
              console.log(vm.savedSlot);

              isNewGame = false;

              $('.game-deck').html('');
              $('#wild-card').html('');
              cards = vm.savedSlot.deck;
              players = vm.savedSlot.players;
              vm.totalPlayer = players.length;
              hands = _.range(players.length).map(function () { return [] });
              console.log(players);
              initUsersOnDeck();
              startDeal(false);
          }

      }
      
})();
