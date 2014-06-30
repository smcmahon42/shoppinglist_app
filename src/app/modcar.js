define(['angular'], function (angular) {
	'use strict';
  
	angular.module('cars', [])
	  .factory('car', function ($log, dieselEngine) {
	    return {
	        type: function() {
	            return dieselEngine.type;
	        }
	    };
	  });

});
