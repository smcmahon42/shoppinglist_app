define(['angular'], function (angular) {
	'use strict';

	//http://shoppinglist-1-1.herokuapp.com/
	//http://localhost:3000/

	return angular.module('apiConfig', []).constant('API_URL', 'http://localhost:3000/');

});
