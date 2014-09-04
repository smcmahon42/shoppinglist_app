define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('loginService', [])
		.factory('logInSvc', ['$rootScope', '$http', '$q', '$location', '$base64', 'apiSvc', 
			function ($rootScope, $http, $q, $location, $base64, apiSvc) {

		  		var currentUser = {
				  loggedIn: false,
			      data: {}
				};

				var logInSvc = {};

				logInSvc.setAuthToken = function(newToken) {
					jQuery.removeCookie('authToken', { path: '/' });
					jQuery.cookie.raw = true;
					jQuery.cookie('authToken', newToken, { expires: 1, path: '/' });
				};

				logInSvc.getAuthToken = function(part){
					if(jQuery.cookie('authToken') !== undefined){
						var tokenCookie = jQuery.cookie('authToken'),
							tokenArray = tokenCookie.split('::');
						if(part == 'id'){
							return tokenArray[1] 
						}else if(part == 'token'){
							return tokenArray[0] 
						}else{
							return tokenCookie;
						}
					}else{
						return false;
					}
				}

				logInSvc.hasCookie = function(){
					if(jQuery.cookie('authToken') !== undefined){
						return true;
					}else{
						return false;
					}
				}

				logInSvc.getCurrentUser = function(){
					if(currentUser.loggedIn){
						return currentUser.data;
					}else{
						logInSvc.setCurrentUser()
						.then(function(data){
							return data;
						},
						function(){
							return false;
						});
					}
				}

				logInSvc.setCurrentUser = function(){

					var deferred = $q.defer(),
						addOptions = {};

					if( currentUser.data.id !== undefined ){ return false; }

					apiSvc.call('GET', 'users/' + logInSvc.getAuthToken('id'), addOptions)
					.success(function(data, status, headers, config) {
						logInSvc.setAuthToken(data[0].token + "::" + data[0].id);
						currentUser.loggedIn = true;
						currentUser.data = data[0];
						deferred.resolve(currentUser.data);
					})
					.error(function(data, status, headers, config) {
						deferred.reject();
					});
					return deferred.promise;

				}

				logInSvc.signup = function(signUpData){

					var deferred = $q.defer(),
						addOptions = {};

					addOptions['data'] = {'user' : signUpData} ;

					apiSvc.call('POST', 'users', addOptions)
					.success(function(data, status, headers, config) {
						//TODO
						//fix the api so it is just data[0] not data[0].user
						var data = data[0].user;
						logInSvc.setAuthToken(data.token + "::" + data.id);
						currentUser.loggedIn = true;
						currentUser.data = data; 
						deferred.resolve(data);
					})
					.error(function(data, status, headers, config) {
						alert('There was an issue with the signup, please try again.');
						deferred.reject(status);
					});

					return deferred.promise;
				}

				logInSvc.login = function(email, password){

					var deferred = $q.defer(),
						addOptions = {};
					addOptions['headers'] = {'Authorization': $base64.encode(email + ":" + password)} 

					apiSvc.call('GET', '/authorize/login', addOptions)
					.success(function(data, status, headers, config) {
						currentUser.loggedIn = true;
						currentUser.data = data[0];
						logInSvc.setAuthToken(data[0].token + "::" + data[0].id);
						deferred.resolve(currentUser.data);
					})
					.error(function(data, status, headers, config) {
						currentUser.data = '';
						currentUser.loggedIn = false;
						logInSvc.setAuthToken(null);
						deferred.reject(status);
					});

					return deferred.promise;

				}

				logInSvc.logout = function(){
					currentUser.loggedIn = false;
					currentUser.data = {};
					jQuery.removeCookie('authToken', { path: '/' });
					$location.path('/');
				}

				return logInSvc;

		}]);//app
});

