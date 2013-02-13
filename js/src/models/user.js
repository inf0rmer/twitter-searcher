define([
	'use!backbone'
], function(Backbone) {
	var endpoint = (window.mocha) ? window.location.protocol + '//' + window.location.hostname + '/test/fixtures/user.json' : 'http://api.twitter.com/1/users/show.json';

	function getRootUrl(url) {
		return url.toString().replace(/^(.*\/\/[^\/?#]*).*$/,"$1");
	}

	return Backbone.Model.extend({

		url: function() {
			return getRootUrl(window.location.href) + '/proxy.php?url=' + encodeURIComponent(endpoint + '?screen_name=' + this.get('screen_name'));
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
			var fetch = _.bind(Backbone.Model.prototype.fetch, this);

			options = options || {};

			return fetch(options).then(_.bind(function() {
				this.trigger('change');
			}, this));
		},

		parse: function(resp) {
			resp.followers_count = Math.random() * 9999;
			return resp;
		}
	});
});