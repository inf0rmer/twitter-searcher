require([
	'use!backbone',
	'jquery',
	'router',
	'models/app',
	'lib/console',
	'use!bootstrap'
], function(Backbone, $, Router, app) {
	$(function() {
		app.router = new Router();
		window.APP = app;
		Backbone.history.start();
	});
});