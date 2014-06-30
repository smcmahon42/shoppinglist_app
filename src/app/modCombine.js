define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('second', [])
			.controller('MyCtrl', ['$scope', 'car', '$injector', function($scope, car, $injector) {
				$scope.second = car.type();
			}]);
});