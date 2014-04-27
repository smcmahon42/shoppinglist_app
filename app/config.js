require.config({
  
  baseUrl: 'app',

  paths: {
    requirejs:          '../lib/requirejs/require',
    'jquery.base64':    '../lib/base64/jquery.base64',
    jquery:             '../lib/jquery/dist/jquery',
    'jquery.cookie':    '../lib/jquery.cookie/jquery.cookie',
    angular:            '../lib/angular/angular',
    'es5-shim':         '../lib/es5-shim/es5-shim',
    'bootstrap-sass':   '../lib/bootstrap-sass/dist/js/bootstrap',
    'angular-scenario': '../lib/angular-scenario/angular-scenario',
    'angular-sanitize': '../lib/angular-sanitize/angular-sanitize',
    'angular-resource': '../lib/angular-resource/angular-resource',
    'angular-route':    '../lib/angular-route/angular-route',
    'angular-mocks':    '../lib/angular-mocks/angular-mocks',
    'angular-cookies':  '../lib/angular-cookies/angular-cookies',
    'angular-animate':  '../lib/angular-animate/angular-animate',
    'angular-gestures':  '../lib/angular-gestures/dist/gestures'
  },

  shim: {
    'angular':               { deps: ['jquery'], exports: 'angular' },
    'angular-route':         { deps: ['angular'] },
    'angular-cookies':       { deps: ['angular'] },
    'angular-gestures':      { deps: ['angular'] },
    'jquery.cookie':         { deps: ['jquery'] },
    'jquery.base64':         { deps: ['jquery'] }
  }

});

require(['app']);
