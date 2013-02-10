define([
	'use!backbone'
], function(Backbone) {
	var app = new Backbone.Model({
		currentSearch : null
	});

	return app;
});