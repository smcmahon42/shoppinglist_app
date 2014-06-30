require.config({
  baseUrl: 'app',
  paths: {
    "angular": "../vendor/angular/angular",
    "angular-animate": "../vendor/angular-animate/angular-animate",
    "angular-cookies": "../vendor/angular-cookies/angular-cookies",
    "angular-resource": "../vendor/angular-resource/angular-resource",
    "angular-route": "../vendor/angular-ui-router/release/angular-ui-router.min",
    "jquery.base64": "../vendor/base64/base64",
    "es5-shim": "../vendor/es5-shim/es5-shim",
    "jquery": "../vendor/jquery/dist/jquery",
    "jquery.cookie": "../vendor/jquery.cookie/jquery.cookie",
  },
  shim: {
    'angular':               { deps: ['jquery'], exports: 'angular' },
    'angular-route':         { deps: ['angular'] },
    'angular-cookies':       { deps: ['angular'] },
    'jquery.cookie':         { deps: ['jquery'] },
    'jquery.base64':         { deps: ['jquery'] }
  },
  priority: ["angular"]
});

window.name = "NG_DEFER_BOOTSTRAP!";

require( [
  'angular',
  'app',
  'jquery',
  'jquery.cookie',
  'jquery.base64',
  'angular-route'
], function(angular, app) {
  'use strict';

  angular.element(document).ready(function() {
    angular.bootstrap(document, [app['name']]);
  });

});

