'use strict';

define(['app'], function(app) {
  
  app.config(function($routeProvider) {

    $routeProvider.when('/page1', {
      templateUrl: 'views/view1.html'
    });

    $routeProvider.when('/home', {
      templateUrl: 'views/home.html'
    });

    $routeProvider.otherwise({
      redirectTo: '/',
      templateUrl: 'views/home.html'
    });

  });

});