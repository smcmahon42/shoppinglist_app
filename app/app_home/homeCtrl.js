'use strict';

define(['require', 'app'], function(require, app, apiSvc) {
  	
  	app.controller('homeCtrl', ['$sce','apiSvc', '$scope', '$http', 
  	function($sce, apiSvc, $scope, $http) {

	    $scope.login = function() {
	      apiSvc.login($scope.user.email, $scope.user.password);
	    };
	     //var Base64 = require('../lib/base64.js').Base64;
	    //console.log(Base64.encode('dankogai'));

	}]);//app
});