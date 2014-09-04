define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('myGroupsMod', [])

		.config(['$stateProvider', function($stateProvider) {

			$stateProvider.state('myGroups', {
				url: "/mygroups",
				lockedPage: true,
				views: {
					'@' : {
						templateUrl : "app/groups/myGroups.tpl.html",
						controller : 'mygroupsCtrl'
					},
					'topNav@myGroups' : {
						templateUrl : "app/navigation/secondaryNav.tpl.html"
					}
				}
			});

		}])

		.controller('mygroupsCtrl', [ '$state', '$rootScope', '$scope', 'logInSvc', 'groupSvc',
			function($state, $rootScope, $scope, logInSvc, groupSvc) {

			//TODO
			//remove user data from root scope and add it only to the login service.
			$scope.noGroups = false;
			$scope.groups = [];
			$scope.userData = logInSvc.getCurrentUser();

			groupSvc.getGroups($scope.userData.id)
			.then(
				function(data){
					$scope.groups = data[0];
					if(data[0] == null){ $scope.noGroups = true; }
				},
				function(error){
					alert('No groups available.');
				}
			);

		}]);//app

});
