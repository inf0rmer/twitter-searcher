define([
	'use!underscore',
	'jquery',
	'views/base',
	'views/result'
], function(_, $, View, ResultView) {
	return View.extend({
		template: 'js/src/views/templates/results.template',

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
			this.bindTo(this.collection, 'loadingMore', this._setLoadingMore);
			this.bindTo(this.collection, 'change', this._unsetLoadingMore);
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
			//console.log('adding', model.id);

			this.listElement.append(view.render().el);
		},

		_addAll: function() {
			this._empty();

			this.listElement.find('.loading').remove();

			this.collection.each(this._addOne, this);

			this.listElement.prepend('<li class="nav-header">Search Results</li>');

			this.loadMoreElement.removeClass('hide');
		},

		_setLoadingMore: function() {
			this.loadMoreElement
			.attr('disabled', true)
			.addClass('loading');
		},

		_unsetLoadingMore: function() {
			this.loadMoreElement
			.removeAttr('disabled')
			.removeClass('loading');
		}
	});
});