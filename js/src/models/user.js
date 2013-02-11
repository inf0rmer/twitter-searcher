define([
	'use!backbone'
], function(Backbone) {
	var endpoint = 'http://api.twitter.com/1/users/show.json';

	function getRootUrl(url) {
		return url.toString().replace(/^(.*\/\/[^\/?#]*).*$/,"$1");
	}

	return Backbone.Model.extend({

		url: function() {
			return endpoint + '?screen_name=' + this.get('screen_name');
		},

		defaults: {
			"id": null,
			"id_str": "",
			"name": "Bruno Abrantes",
			"screen_name": "inf0rmer",
			"followers_count": 802
		},

		initialize: function(options) {
			if (!options.screen_name) {
				throw new Error('Model needs a screen_name on initialization');
			}
		},

		fetch: function(options) {
			var fetch = _.bind(Backbone.Model.prototype.fetch, this),
				dfd = $.Deferred();

			options = options || {};

			options = _.extend(options, {
				dataType: (getRootUrl(window.location.href) === getRootUrl(this.url())) ? 'json' : 'jsonp'
			});

			if (!options.update) {
				this.trigger('fetching');
			}

			fetch(options).then(_.bind(function() {
				this.trigger('change');
				dfd.resolve();
			}, this));

			return dfd;
		}
	});
});