define([
	'use!underscore',
	'jquery',
	'views/base',
	'views/result',
	'text!views/templates/results.template'
], function(_, $, View, ResultView, template) {
	return View.extend({
		template: template,

		elements: ['list', 'loadMore'],

		className: 'nav nav-list',

		events: {
			'click [data-action="load-more"]': 'loadMore'
		},

		initialize: function() {
			this.bindTo(this.collection, 'reset', this._addAll);
			this.bindTo(this.collection, 'add', this._addOne);
			this.bindTo(this.collection, 'fetching', function() {
				this._empty();
			});
		},

		loadMore: function(evt) {
			evt.preventDefault();
			this.collection.next();
		},

		_empty: function() {
			this.listElement.html('<li class="nav-header loading">Loading &hellip;</li>');
		},

		_addOne: function(model) {
			var view = new ResultView({model: model});

			this.listElement.append(view.render().el);
		},

		_addAll: function() {
			this.listElement.find('.loading').remove();

			this.collection.each(this._addOne, this);

			this.listElement.prepend('<li class="nav-header">Results</li>');

			this.loadMoreElement.removeClass('hide');
		}
	});
});