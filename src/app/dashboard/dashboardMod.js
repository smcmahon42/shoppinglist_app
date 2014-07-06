define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('dashboardMod', [])

		.config(['$stateProvider', function($stateProvider) {

			$stateProvider.state('dashboard', {
				url: "/dashboard",
				templateUrl: "app/dashboard/dashboard.tpl.html",
				controller: 'dashCtrl',
				lockedPage: true
			});

		}])

		.controller('dashCtrl', [ '$scope', 'logInSvc',
			function( $scope, logInSvc) {
			

		}]);//app

});

