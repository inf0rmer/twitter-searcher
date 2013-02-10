define([
	'use!backbone',
	'jquery',
	'collections/live',
	'models/result'
], function(Backbone, $, LiveCollection, Result){

	var endpoint = "http://search.twitter.com/search.json";

	function getRootUrl(url) {
		return url.toString().replace(/^(.*\/\/[^\/?#]*).*$/,"$1");
	}

	return LiveCollection.extend({
		_numberOfResults: 10,

		_page: 1,

		model: Result,

		url: function() {
			var term = encodeURIComponent(this.term);
			return endpoint + '?q='+ term +'&rpp='+ this._numberOfResults +'&page='+ this._page +'&include_entities=false&result_type=mixed';
		},

		fetch: function(options) {
			var fetch = _.bind(Backbone.Collection.prototype.fetch, this),
				dfd = $.Deferred();

			options = options || {};

			options = _.extend(options, {
				diff: true,
				dataType: (getRootUrl(window.location.href) === getRootUrl(this.url())) ? 'json' : 'jsonp'
			});

			if (options.data && options.data.term) {
				this.term = options.data.term;
			}

			if (!options.update) {
				this.trigger('fetching');
			}

			fetch(options).then(_.bind(function() {
				this.trigger('change');
				dfd.resolve();
			}, this));

			return dfd;
		},

		next: function() {
			this._page += 1;
			this.fetch({
				update: true
			});
		},

		parse: function(resp) {
			this._nextPage = endpoint + resp.next_page;
			return resp.results;
		}
	});
});