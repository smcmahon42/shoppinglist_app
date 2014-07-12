define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('groupService', [])
		.factory('groupSvc', ['$rootScope', '$http', '$q', '$location', '$base64', 'apiSvc', 
			function ($rootScope, $http, $q, $location, $base64, apiSvc) {

				var groupSvc = {};


				groupSvc.getGroups = function(){

					var deferred = $q.defer(),
						addOptions = {};

					apiSvc.call('GET', 'users/1/groups', addOptions)
					.success(function(data, status, headers, config) {
						deferred.resolve(data);
						//console.log(data);
					})
					.error(function(data, status, headers, config) {
						deferred.reject('error');
						//console.log(status);
					});

					return deferred.promise;

				}

				return groupSvc;

		}]);//app
});

