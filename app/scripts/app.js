'use strict';

/**
 * @ngdoc overview
 * @name adneomTestApp
 * @description
 * # adneomTestApp
 *
 * Main module of the application.
 */
angular
  .module('adneomTestApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/comments', {
        templateUrl: 'views/comments.html',
        controller: 'CommentsCtrl',
        controllerAs: 'comments'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
