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
			this.model.fetch();
			this.bindTo(this.model, 'error', this.showError);
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
		}
	});
});