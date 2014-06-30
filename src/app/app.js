define([
	'require', 
	'angular', 
	'modCombine',
	'modcar',
	'modengines'
	], function () {
		'use strict';

		// Declare app level module which depends on filters, and services
		return angular.module('listApp', ['ui.router','second','cars','engines'])
		.controller('GreetingController', ['$scope', function($scope) {
		  $scope.greeting = 'Hola yo!';
		}]);
});
