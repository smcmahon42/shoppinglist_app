define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('homeMod', [])

		.config(['$stateProvider', function($stateProvider) {
			
			$stateProvider.state('/', {
				url: "/",
				templateUrl: "app/home/home.tpl.html",
				controller: 'homeCtrl',
				lockedPage: false
			});

		}])

		.controller('homeCtrl', ['$rootScope', '$scope', '$location', '$state', 'logInSvc',
		  	function($rootScope, $scope, $location, $state, logInSvc) {

		  	$scope.signInError = false;
		  	$scope.signin = {
		  		email : '',
		  		password : ''
		  	}

			$scope.login = function() {

				if($scope.signin.email === '' || $scope.signin.password === ''){
					$scope.signInError = true;
					alert('both fields need to be filled out');
				}else{
					logInSvc.login(
						$scope.signin.email, 
						$scope.signin.password
					)
					.then(function(userData){
						$rootScope.currentUser.loggedIn = true;
						$rootScope.currentUser.data = userData;
						$state.go('dashboard');
					},function(status){
						alert('There is an error in your form. Please try again.');
					});
				}

			}//$scope.login 

		}]);//app
});

