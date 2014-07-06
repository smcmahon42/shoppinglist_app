define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('signupMod', [])

		.config(['$stateProvider', function($stateProvider) {

			$stateProvider.state('signup', {
				url: "/signup",
				templateUrl: "app/signup/signup.tpl.html",
				controller: 'signupCtrl',
				lockedPage: false
			});

		}])

		.controller('signupCtrl', ['$state', '$scope', 'logInSvc', function($state, $scope, logInSvc) {
			
			$scope.signup = {};

			$scope.register = function(signUpData){

				logInSvc.signup(signUpData).then(
					function(userData){
						$scope.signupData.firstTime = true;
						$scope.currentUser.loggedIn = true;
						$scope.currentUser.data = userData;
						$state.go('dashboard');
					}
				);
				
			};//$scope.register 

		}]);//app

});
