/* Adapted from https://github.com/rmurphey/srchr-demo/blob/master/app/controllers/base.js */
define([
	'use!underscore'
], function(_) {
	var Controller = function(options) {
		this.views = [];
		this.initialize(options);
		return this;
	};

	Controller.prototype = {
		name: 'base',

		initialize: function(options) {
			_.extend(this, options);
		},

		destroy: function() {
			_.each(this.views, function(view) {
				if (view.destroy && _.isFunction(view.destroy)) {
					view.destroy();
				}
			});

			this.views = [];
		},

		addView: function(View, options, node) {
			var view = new View(options).render().placeAt(node);
			this.views.push(view);
			return view;
		},

		update: function() {

		}
	};

	return Controller;
});