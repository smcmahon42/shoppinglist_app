define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('apiService', [])
		.factory('apiSvc', ['$http', '$q', 'API_URL', 
			function ($http, $q, API_URL) {

				var apiSvc = {};

				apiSvc.call = function (method, urlresource, options) {

					var deferred = $q.defer();	

					var request = {
						method: method.toUpperCase(),
						url: API_URL + urlresource,
						dataType: 'json',
						cache: false
					};
					
					if(method == 'POST' && jQuery.cookie('authToken') != undefined ){
						var tokenCookie = jQuery.cookie('authToken');
						var tokenArray = tokenCookie.split('::'); 
						request.headers = { 'X-XSRF-TOKEN' : tokenArray[0] }
					}

					jQuery.extend(request, options);
					
					return $http(request).
					success(function(data, status, headers, config) {
							return data;
						}).
					error(function(data, status, headers, config) {
						if(status == 0 || status == 403) {
							alert("ERROR:"+status+" Logged out because server failed to respond.");							
						}
					});

				};

				return apiSvc;

		}]);//app
});

