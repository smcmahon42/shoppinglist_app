'use strict';

define(['require', 'app'], function(require, app) {
  

  app.controller('dashboardCtrl', ['$scope', function($scope) {

    $scope.init = function() {
      alert('welcome to the dashboard');
    };

    $scope.init();
    
  }]);

});

