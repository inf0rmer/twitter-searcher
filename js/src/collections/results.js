define([
	'use!backbone',
	'jquery',
	'models/result'
], function(Backbone, $, Result){

	var endpoint = "http://search.twitter.com/search.json";

	function getRootUrl(url) {
		return url.toString().replace(/^(.*\/\/[^\/?#]*).*$/,"$1");
	}

	return Backbone.Collection.extend({
		_numberOfResults: 10,

		_nextPage: null,

		_prevTerm: null,

		term: null,

		model: Result,

		url: function() {
			var term = encodeURIComponent(this.term);
			if (this._nextPage !== null && term === this._prevTerm) {
				return this._nextPage;
			}
			return getRootUrl(window.location.href) + '/proxy.php?url=' + encodeURIComponent(endpoint + '?q='+ term +'&rpp='+ this._numberOfResults +'&include_entities=false&result_type=recent');
		},

		fetch: function(options) {
			var fetch = _.bind(Backbone.Collection.prototype.fetch, this),
				dfd = $.Deferred();

			options = options || {};

			if (options.data && options.data.term) {
				this.term = options.data.term;
			}

			if (!options.update) {
				this.trigger('fetching');
			}

			if (options.term) {
				this._prevTerm = options.term;
			}

			return fetch(options).then(_.bind(function() {
				this.trigger('change');
				dfd.resolve();
			}, this));
		},

		next: function() {
			if (!this._nextPage) {
				throw new Error('_nextPage needs to be defined');
			}

			this.trigger('loadingMore');
			return this.fetch({
				remove: false,
				update: true
			});
		},

		parse: function(resp) {
			this._nextPage = getRootUrl(window.location.href) + '/proxy.php?url=' + encodeURIComponent(endpoint + resp.next_page);
			return resp.results;
		}
	});
});