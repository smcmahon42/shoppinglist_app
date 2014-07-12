define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('myGroupsMod', [])

		.config(['$stateProvider', function($stateProvider) {

			$stateProvider.state('myGroups', {
				url: "/groups",
				templateUrl: "app/groups/myGroups.tpl.html",
				controller: 'mygroupsCtrl',
				lockedPage: true
			});

		}])

		.controller('mygroupsCtrl', [ '$state', '$rootScope', '$scope', 'groupSvc',
			function($state, $rootScope, $scope, groupSvc) {

			$scope.groups = [{"name":"b"}, {"name":"bar"}];
			console.log($state.current);
			var userId = $rootScope.currentUser.data.id; 
			console.log(userId);

			// groupSvc.getGroups()
			// .then(
			// 	function(data){
			// 		$scope.groups = data[0];
			// 	},
			// 	function(error){
			// 		alert('No groups available.');
			// 	}
			// );

		}]);//app

});
