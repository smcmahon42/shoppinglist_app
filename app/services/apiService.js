'use strict';

define(['require', 'app'], function(require, app) {
  
	app.factory('apiSvc', ['$rootScope', '$location', '$http', '$q', 
	function($rootScope, $location, $http, $q) {
		
		//api_url
			
	    var apiSvc = {
	      loggedIn: false,
	      user: {}
	    };


	    apiSvc.augment = function(){
	    	var deferred = $q.defer();

	    	var addOptions = {};
	    	addOptions['data'] = { group : { 'group_name': 'Trader Joes' } };
	    	addOptions['headers'] = { 'X-XSRF-TOKEN' : jQuery.cookie('authToken') };

	    	apiSvc.call('PUT', '/groups/3', addOptions).
	    	success(function(data, status, headers, config) {
				console.log(data);	    		
	    	}).
	        error(function(data, status, headers, config) {
	        	console.log('did not work');
	        });
			
	        return deferred.promise;
	    }


	    apiSvc.login = function(email, password){
	      var deferred = $q.defer();

	      var addOptions = {};
	      addOptions['headers'] = {'Authorization': jQuery.base64.encode(email + ":" + password)} 

	      apiSvc.call('GET', '/authorize/login', addOptions).
	        success(function(data, status, headers, config) {
	          apiSvc.loggedIn = true;
	          apiSvc.setAuthToken(data[0].token);
	          //deferred.resolve(data);
	          //$location.path('/');
	        }).
	        error(function(data, status, headers, config) {
	          apiSvc.user.error = data;
	          apiSvc.loggedIn = false;
	          apiSvc.setAuthToken(null);
	          if(status == 0) {
	            apiSvc.user.error = 'The server is not responding.';
	          }
	          deferred.reject(data);
	        });
			
	       return deferred.promise;
	    }


		apiSvc.setAuthToken = function(newToken) {
			var expireDate = new Date();
			expireDate.setDate(expireDate.getDate() + 14);
			jQuery.cookie.raw = true;
			jQuery.cookie('authToken', newToken, { expires: 1, path: '/' });
		};


	    apiSvc.call = function (method, urlresource, options) {
	      var request = {
	        method: method.toUpperCase(),
	        url: api_url + urlresource,
	        dataType: 'json',
	        cache: false
	      };
	      jQuery.extend(request, options);
	      return $http(request).
	        error(function(data, status, headers, config) {
	          if(status == 403) {
	            apiSvc.logout('Logged out because your login token is no longer valid. Please login again.');
	          } else if(status == 0) {
	            alert("Logged out because server failed to respond");
	          }
	        });
	    };


	    return apiSvc;

	}]);//apiSvc

});