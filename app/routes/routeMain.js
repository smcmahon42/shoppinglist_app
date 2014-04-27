'use strict';

define(['app'], function(app) {
  
  app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/login', {
      templateUrl: 'app/app_login/loginView.html',
    });

    $routeProvider.when('/signup', {
      templateUrl: 'app/app_signup/signupView.html',
      controller: 'signupCtrl'
    }); 

    $routeProvider.when('/dashboard', {
      templateUrl: 'app/app_dashboard/dashboardView.html',
      controller: 'dashboardCtrl'
    });    

    $routeProvider.when('/', {
      templateUrl: 'app/app_home/homeView.html',
      controller: 'homeCtrl'
    });

    $routeProvider.otherwise({
      templateUrl: 'app/app_home/homeView.html'
    });

  }]);

});
