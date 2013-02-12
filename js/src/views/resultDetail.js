define([
	'jquery',
	'views/base',
	'views/error',
	'lib/humanizer'
], function($, View, ErrorView, humanize) {
	return View.extend({
		template: 'js/src/views/templates/resultDetail.template',

		tagName: 'article',

		className: 'result-detail',

		initialize: function() {
			this.bindTo(this.model, 'change', this.render);
			this.bindTo(this.model, 'destroy', this.destroy);
			this.bindTo(this.model, 'error', this.showError);

			this.model.fetch()
			.then(function() {
				Backbone.trigger('visualisation/layoutSubviews');
			});
		},

		showError: function() {
			new ErrorView().render().placeAt(this.$el, 'only');
		},

		serialize: function() {
			var data = View.prototype.serialize.call(this, arguments);

			data.tweet_created_at = this.options.tweet_created_at || new Date();
			data.tweet_text = this.options.tweet_text || "A Tweet";

			data.time_ago = humanized_time_span(new Date(data.tweet_created_at));
			data.followers_count_pretty = humanize.format_number(data.followers_count, 0);

			return data;
		},

		destroy: function() {
			// Give a chance for all other events to run (namely the one that will call _removeView from VisualisationView)
			setTimeout(function() {
				Backbone.trigger('visualisation/layoutSubviews');
			}, 0);
			View.prototype.destroy.call(this, arguments);
		}
	});
});