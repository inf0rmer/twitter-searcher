define([
	'use!underscore',
	'jquery',
	'views/base',
	'views/result',
	'views/error'
], function(_, $, View, ResultView, ErrorView) {
	return View.extend({
		template: 'js/src/views/templates/results.template',

		elements: ['list', 'loadMore'],

		className: 'nav nav-list',

		events: {
			'click [data-action="load-more"]': 'loadMore'
		},

		_loadingMore: false,
		_lastItemOffset: null,

		_errorView: null,

		initialize: function() {
			this.bindTo(this.collection, 'reset', this._addAll);
			this.bindTo(this.collection, 'add', this._addOne);
			this.bindTo(this.collection, 'fetching', function() {
				this._empty();
			});
			this.bindTo(this.collection, 'loadingMore', this._setLoadingMore);
			this.bindTo(this.collection, 'change', this._unsetLoadingMore);
			this.bindTo(this.collection, 'error', this.showError);

			this._loadingMore = false;

			if (this._errorView) {
				this._errorView.destroy();
			}
		},

		showError: function() {
			this._errorView = new ErrorView().render().placeAt(this.$el, 'first');
			this._loadingMore = false;
			this._unsetLoadingMore();
		},

		loadMore: function(evt) {
			evt.preventDefault();
			this.collection.next();

			if (this._errorView) {
				this._errorView.destroy();
			}
		},

		_empty: function() {
			if (this._errorView) {
				this._errorView.destroy();
			}

			this.listElement.html('<li class="loading"><i class="icon-refresh icon-spin">&nbsp;</i>Loading &hellip;</li>');
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

			this.loadMoreElement.removeClass('hide');
		},

		_setLoadingMore: function() {
			var $wrapper = this.$el.find('.wrapper'),
				$sidebar = this.$el.find('.sidebar');

			this.loadMoreElement
			.attr('disabled', true)
			.addClass('loading');

			this._loadingMore = true;

			if ($wrapper.get(0).scrollHeight > $wrapper.get(0).scrollWidth) {
				this._lastItemOffset = $wrapper.get(0).scrollHeight - $wrapper.height();
			} else {
				this._lastItemOffset = $sidebar.get(0).scrollWidth - $sidebar.width();
			}
		},

		_unsetLoadingMore: function() {
			var $wrapper = this.$el.find('.wrapper'),
				$sidebar = this.$el.find('.sidebar'),
				options={};

			this.loadMoreElement
			.removeAttr('disabled')
			.removeClass('loading');

			if (this._loadingMore) {
				if ($wrapper.get(0).scrollHeight > $wrapper.get(0).scrollWidth) {
					options.scrollTop = this._lastItemOffset;
					$wrapper.animate(options, 'slow');
				} else {
					options.scrollLeft = this._lastItemOffset;
					$sidebar.animate(options, 'slow');
				}

			}

			this._loadingMore = false;
		}
	});
});