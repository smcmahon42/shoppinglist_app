define(['angular'], function (angular) {
	'use strict';
	angular.module('engines', [])
	  .factory('dieselEngine', function () {
	    return {
		   type: 'diesel'
		    };
		  });
});
