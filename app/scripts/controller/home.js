'use strict';

define(['app'], function (app) {
    app.register.controller('HomeCtrl', function ($scope) {
        $scope.message = "Message from HomeCtrl"; 
    });
}); 
