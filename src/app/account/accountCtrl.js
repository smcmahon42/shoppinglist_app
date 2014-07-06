'use strict';

define(['require', 'app'], function(require, app) {
  

  app.controller('accountCtrl', ['$rootScope', '$scope', 'userSvc', function($rootScope, $scope, userSvc) {

  	$rootScope.currentUsers = [ $rootScope.userStatus.data ];

  }]);

});
