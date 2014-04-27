"use strict";

define(

  [
    /********************************************************
     * Library Dependencies
     ********************************************************
     * All 3rd-party libraries needed by the application are
     * loaded here.
     */
    'angular',
    'angular-cookies',
    'angular-gestures',
    'angular-route',
    'jquery', 
    'jquery.cookie',
    'jquery.base64'
  ],

  // Initialize r360Admin.js, given dependencies
  function(angular, angularCookies, angularGenstures, angularRoute, jQuery, jQueryCookies, base64) {

    // Define the root angular module for the application.
    // It depends on ngRoute for routing.
    var listApp = angular.module('ListApp', ['ngRoute', 'angularGenstures']);

    require(
      [
        'routes/routeMain',
        'services/apiConfig',
        'services/apiService',
        //homepage
        'app_home/homeCtrl',
        //signup page
        'app_signup/signupCtrl',
        //dashboard
        'app_dashboard/dashboardCtrl'

      ],
      function() {
        angular.element(document).ready(function() {
          angular.bootstrap(document, ['ListApp']);
        });
      }
    );

    return listApp;
  }

);

