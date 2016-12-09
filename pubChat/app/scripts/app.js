'use strict';

/**
 * @ngdoc overview
 * @name pubChatApp
 * @description
 * # pubChatApp
 *
 * Main module of the application.
 */
angular
  .module('pubChatApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pubnub.angular.service'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/join', {
        templateUrl: 'views/join.html',
        controller: 'JoinCtrl',
        controllerAs: 'join'
      })
      .otherwise({
        redirectTo: '/join'
      });
  });
