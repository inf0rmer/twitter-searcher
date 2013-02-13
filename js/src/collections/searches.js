define([
	'use!backbone',
	'use!underscore',
	'models/search'
], function(Backbone, _, Search) {

	var Searches = Backbone.Collection.extend({

		storeKey: 'searches',

		model: Search,

		comparator: function(search) {
			return -search.get('time');
		},

		save: function(search) {
			if (!window.localStorage) { return false; }
			window.localStorage.setItem(this.storeKey, window.JSON.stringify(this.toJSON()));
		},

		initialize: function() {
			this.on('add remove change', this.save);
		},

		fetch: function() {
			if (!window.localStorage) { return false; }
			var searches = window.JSON.parse(window.localStorage.getItem(this.storeKey));
			_.each(searches, _.bind(this.add, this));
		}
	});

	// Prevent adding duplicates
	Searches.prototype.add = function(search) {
		var isDupe = this.any(function(_search) {
			var term = (!_.isUndefined(search.get)) ? search.get('term') : search.term;
			return _search.get('term') === term;
		});

		if (!isDupe) {
			Backbone.Collection.prototype.add.call(this, search);
		}
	};

	return Searches;
});