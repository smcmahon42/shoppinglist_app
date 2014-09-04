define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('groupService', [])
		.factory('groupSvc', ['$rootScope', '$http', '$q', '$location', '$base64', 'apiSvc', 
			function ($rootScope, $http, $q, $location, $base64, apiSvc) {

				var groupSvc = {};

				groupSvc.makeGroup = function(id, groupName, isPrivate){

					var deferred = $q.defer(),
						addOptions = {};
					addOptions['data'] = {
						group : {
							'group_name': groupName,
					    	'private': isPrivate	
						}
					}

					apiSvc.call('POST', 'users/'+id+'/groups', addOptions)
					.success(function(data, status, headers, config) {
						deferred.resolve(data);
					})
					.error(function(data, status, headers, config) {
						deferred.reject('error');
					});

					return deferred.promise;
				}


				groupSvc.getGroups = function(id){

					var deferred = $q.defer(),
						addOptions = {};

					apiSvc.call('GET', 'users/'+id+'/groups', addOptions)
					.success(function(data, status, headers, config) {
						deferred.resolve(data);
					})
					.error(function(data, status, headers, config) {
						deferred.reject('error');
					});

					return deferred.promise;

				}

				return groupSvc;

		}]);//app
});

