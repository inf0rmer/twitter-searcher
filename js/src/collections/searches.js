define([
	'use!backbone',
	'use!underscore',
	'models/search'
], function(Backbone, _, Search) {

	return Backbone.Collection.extend({

		storeKey: 'searches',

		model: Search,

		save: function() {
			/* TODO use shim instead */
			window.localStorage.setItem(this.storeKey, window.JSON.stringify(this.toJSON()));
		},

		initialize: function() {
			this.on('add remove change', this.save);
		},

		fetch: function() {
			/* TODO use shim instead */
			var searches = window.JSON.parse(window.localStorage.getItem(this.storeKey));
			_.each(searches, _.bind(this.add, this));
		}
	});
});