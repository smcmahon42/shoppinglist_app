// we get all the test files automatically
var tests = [];
for (var file in window.__karma__.files) {
	if (window.__karma__.files.hasOwnProperty(file)) {
		if (/spec\.js$/i.test(file)) {
			tests.push(file);
		}
	}
}

require.config({

	baseUrl: '/base/src/app',
	paths: {
		"angular": "../vendor/angular/angular",
		"angular-animate": "../vendor/angular-animate/angular-animate",
		"angular-cookies": "../vendor/angular-cookies/angular-cookies",
		"angular-resource": "../vendor/angular-resource/angular-resource",
		"angular-route": "../vendor/angular-route/angular-route",
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
	deps: tests,
	callback: window.__karma__.start
});


