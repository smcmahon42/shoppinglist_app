define([
	/* Define Module File paths here */
	'require', 
	'angular', 
	'_services/apiConfig',
	'_services/apiService',
	'_services/loginService',
	'home/homeMod',
	'dashboard/dashboardMod',
	'signup/signupMod'
	], function () {
		'use strict';

		// Declare app main module which depends on filters, and services
		return angular.module('listApp', 
			[
			//Module Dependents go here
			'ui.router',
			'base64',
			'homeMod', 
			'signupMod', 
			'dashboardMod', 
			'apiConfig', 
			'apiService',
			'loginService'
			])

			.run(['$state', '$location', 'logInSvc', function ($state, $location, logInSvc) {
				// ON INTIAL LOAD RUN THIS CHECK. EITHER A USER IS LOGGED IN OR NOT.
				if( !logInSvc.hasCookie() ){ //if not logged in go to sign in
					$state.go('/');
				}else if( $location.path() == '' || $location.path() == '/' ){ //if logged in and no path go to dashboard page
					$state.go('dashboard');
				}
			}])

			.controller('mainController', ['$rootScope', '$scope', '$state', 'logInSvc', 
				function($rootScope, $scope, $state, logInSvc) {

				$scope.currentUser = { loggedIn: false };
				$scope.signupData  = { firstTime: false };

				//Global OnClick calls
				$scope.logoutBtn = function(){
					$scope.currentUser = { loggedIn: false };
					$scope.signupData  = { firstTime: false };
					logInSvc.logout();
				}

				$rootScope.$on('$stateChangeStart', function(event, toState, fromState){ 

					var hasCookie = logInSvc.hasCookie();
					//On State change check if user is logged in and if so then 
					//redirect to dashboard if coming from home page.
					if((toState.url == '' || toState.url == '/') && hasCookie){
						event.preventDefault();
						$state.go('dashboard');
					}
					//If not logged in do not allow to locked pages.
					if(toState.lockedPage && !hasCookie){
						event.preventDefault();
						$state.go('/');
					}

				});

				//If person is logged in with cookie and has refreshed page 
				//load their data in $scope.currentUser
				if(logInSvc.hasCookie() && !$scope.currentUser.loggedIn){
					logInSvc.setCurrentUser().then(
						function(currentUser){
							$scope.currentUser.loggedIn = true;
							$scope.currentUser.data = currentUser;
						}
					);	
				}

			}]);//app
});
