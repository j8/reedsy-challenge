'use strict';

/**
 * @ngdoc overview
 * @name reedsyChallengeApp
 * @description
 * # reedsyChallengeApp
 *
 * Main module of the application.
 */
angular
  .module('reedsyChallengeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularUtils.directives.dirPagination',
    'relativeDate'
  ])
  .constant('production', false)
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'IndexCtrl',
        controllerAs: 'index',
        resolve: {
          books: function(Books) {
             return Books.query({page: 1}).$promise.then(function(books){
                 return books;
               });
           }
        }
      })
      .when('/books/:bookId', {
        templateUrl: 'views/book.html',
        controller: 'BookCtrl',
        controllerAs: 'book',
        book: function(Books, $stateParams) {
            return  Books.get({bookId: $stateParams.bookId}).$promise.then(function(book){
              return book;
            });
          }
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true);
  })

  // Disable debug info and boost the performance

  .config(['$compileProvider', 'production', function ($compileProvider, production) {
      if(production) {
          $compileProvider.debugInfoEnabled(false);
      }
  }]);