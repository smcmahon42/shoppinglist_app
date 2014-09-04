define([
	/* Define Module File paths here */
	'require', 
	'angular', 

	'_services/apiConfig',
	'_services/apiService',
	'_services/loginService',
	'_services/groupService',

	'groups/myGroupsMod',
	'groups/makeGroupMod',
	'groups/joinGroupMod',
	'groups/groupMod',

	'account/editAccountMod',
	'lists/listMod',
	'dashboard/dashboardMod',
	'signup/signupMod',
	'home/homeMod'
	], function () {
		'use strict';

		// Declare app main module which depends on filters, and services
		return angular.module('listApp', 
			[
			//Module Dependents go here
			'ui.router',
			'base64',
			
			//Services
			'apiConfig',
			'apiService',
			'groupService',
			'loginService',

			//Section Modules
			'myGroupsMod',
			'makeGroupMod',
			'joinGroupMod',
			'groupMod',

			'listMod',
			'editAccountMod',
			'dashboardMod',
			'signupMod',
			'homeMod'
			])

			.run(['$state', '$location', 'logInSvc', '$rootScope', function ($state, $location, logInSvc, $rootScope) {
				// ON INTIAL LOAD RUN THIS CHECK. EITHER A USER IS LOGGED IN OR NOT.
				if( !logInSvc.hasCookie() ){ //if not logged in go to sign in
					$state.go('/');
				}else if( $location.path() == '' || $location.path() == '/' ){ //if logged in and no path go to dashboard page
					$state.go('dashboard');
				}

			}])

			.controller('mainController', ['$rootScope', '$scope', '$state', 'logInSvc', 
				function($rootScope, $scope, $state, logInSvc) {

				$rootScope.currentUser = { loggedIn: false };
				$rootScope.signupData  = { firstTime: false };

				//Global OnClick calls
				$scope.logoutBtn = function(){
					$rootScope.currentUser = { loggedIn: false };
					$rootScope.signupData  = { firstTime: false };
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
							$rootScope.currentUser.loggedIn = true;
						}
					);	
				}

			}]);//app
});
