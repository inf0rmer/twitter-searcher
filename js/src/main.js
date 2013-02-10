require([
	'use!backbone',
	'jquery',
	'router',
	'models/app',
	'lib/console',
	'views/templates/templates',
	'use!bootstrap'
], function(Backbone, $, Router, app) {
	$(function() {
		app.router = new Router();
		window.APP = app;
		Backbone.history.start({pushState: true});

		$(document).on('click', 'a:not([data-bypass])', function (evt) {
			var href = $(this).attr('href'),
				protocol = this.protocol + '//';

			if (href.slice(protocol.length) !== protocol) {
				evt.preventDefault();
				app.router.navigate(href, true);
			}
		});
	});
});