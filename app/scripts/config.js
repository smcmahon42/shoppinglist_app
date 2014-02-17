require.config({
  paths: {
    sizzle: "lib/sizzle/dist/sizzle",
    requirejs: "lib/requirejs/require",
    jquery: "lib/jquery/jquery",
    angular: "lib/angular/angular",
    "bootstrap-sass": "lib/bootstrap-sass/dist/js/bootstrap",
    "angular-scenario": "lib/angular-scenario/angular-scenario",
    "angular-sanitize": "lib/angular-sanitize/angular-sanitize",
    "angular-resource": "lib/angular-resource/angular-resource",
    "angular-mocks": "lib/angular-mocks/angular-mocks",
    "angular-cookies": "lib/angular-cookies/angular-cookies",
    "angular-animate": "lib/angular-animate/angular-animate",
    "angular-route": "lib/angular-route/angular-route",
    "jquery.cookie": "lib/jquery.cookie/jquery.cookie",
    "es5-shim": "lib/es5-shim/es5-shim",
  },
  shim: {
    "angular":               { deps: ['jquery'], exports: 'angular' },
    'angular-route':         { deps: ['angular'] },
    'jquery.cookie':         { deps: ['jquery'] }
  }
});

require(['app']);
