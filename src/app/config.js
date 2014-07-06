require.config({
  baseUrl: 'app',
  paths: {
    "angular": "../vendor/angular/angular",
    "angular-animate": "../vendor/angular-animate/angular-animate",
    "angular-cookies": "../vendor/angular-cookies/angular-cookies",
    "angular-resource": "../vendor/angular-resource/angular-resource",
    "angular-base64": "../vendor/angular-base64/angular-base64",
    "ui-router": "../vendor/angular-ui-router/release/angular-ui-router",
    "es5-shim": "../vendor/es5-shim/es5-shim",
    "jquery": "../vendor/jquery/dist/jquery",
    "jquery.cookie": "../vendor/jquery.cookie/jquery.cookie",
  },
  shim: {
    'angular':           { deps: ['jquery'], exports: 'angular' },
    'ui-router':         { deps: ['angular'] },
    'angular-cookies':   { deps: ['angular'] },
    'angular-base64':    { deps: ['angular'] },
    'jquery.cookie':     { deps: ['jquery'] }
  },
  priority: ["angular"]
});

window.name = "NG_DEFER_BOOTSTRAP!";

require( [
  'angular',
  'app',
  'jquery',
  'jquery.cookie',
  'angular-base64',
  'ui-router'
], function(angular, app) {
  'use strict';

  angular.element(document).ready(function() {
    angular.bootstrap(document, [app['name']]);
  });

});

