var tests = [];
for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/app',

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
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});

