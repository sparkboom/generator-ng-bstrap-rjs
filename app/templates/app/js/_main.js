(function(document, require){
	'use strict';

	require.config({
		baseUrl: 'modules/',
		paths: {
			'lodash' : '../bower_components/lodash/dist/lodash.min',
			'angular' : '../bower_components/angular/angular.min',
			'jquery' : '../bower_components/jquery/dist/jquery.min',
			'uiBootstrapTemplates' : '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
			'bootstrap' : '../bower_components/bootstrap/dist/js/bootstrap.min',
			'uiBootstrap' : '../bower_components/angular-bootstrap/ui-bootstrap.min'
		},
		shim : {

			'angular' : {
				'exports' : 'angular'
			},
			'lodash' : {
				'exports' : '_'
			},
			'jquery' : {
				'exports' : '$'
			},
			'bootstrap' : {
				deps: ['jquery']
			},
			'uiBootstrap' : {
				deps: ['angular', 'bootstrap']
			},
			'uiBootstrapTemplates' : {
				deps: ['angular', 'uiBootstrap']
			}
		},
		priority:[
			'angular'
		]
	})	

	require( [
		'angular',
		'<%= appClassName %>.app',
		'bootstrap',
		'uiBootstrapTemplates',
		'uiBootstrap',
	], function(ng, autofinanceApp) {

		ng.element(document).ready(function() {
			
			ng.bootstrap(document, [
				autofinanceApp.name,
				'ui.bootstrap',
				'ui.bootstrap.tpls',
				'ui.bootstrap.alert'
			]);
		});
	});

})(document, require);
