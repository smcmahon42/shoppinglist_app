"use strict";
define(

  [
    /********************************************************
     * Library Dependencies
     ********************************************************
     * All 3rd-party libraries needed by the application are
     * loaded here.
     */
    'angular', 'angular-route',
    'jquery', 'jquery.cookie'
  ],

  // Initialize r360Admin.js, given dependencies
  function(angular, angularRoute, jQuery, jQueryCookies) {

    // Define the root angular module for the application.
    // It depends on ngRoute for routing.
    var app = angular.module('App', ['ngRoute']);

    require(
      [
        'routes/mainRoute'
      ],
      function() {
        angular.element(document).ready(function() {
          angular.bootstrap(document, ['App']);
        });
      }
    );

    return app;
  }

);

