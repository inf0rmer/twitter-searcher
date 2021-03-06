define([
	'use!underscore',
	'jquery',
	'views/base'
], function(_, $, View) {
	return View.extend({
		template: 'js/src/views/templates/searches.template',

		itemTemplate: window.JST['js/src/views/templates/searchItem.template'],

		className: 'btn-group',

		elements: ['recentSearches'],

		events: {
			'click .js-recentSearches a': '_setSelected'
		},

		initialize: function() {
			if (!_.isFunction(this.options.currentSearch)) {
				throw new Error('Recent Searches needs a currentSearch function');
			}

			this.bindTo(this.collection, 'add change remove', this._update);
		},

		afterRender: function() {
			this._update();
		},

		_setSelected: function(evt) {
			this.recentSearchesElement.find('li').removeClass('active');
			$(evt.currentTarget).parents('li').addClass('active');
		},

		_update: function() {
			this.collection.sort();

			var tpl = this.itemTemplate,
				currentSearch = this.options.currentSearch(),
				searches,
				html;

			searches = this.collection.map(function(item) {
				var data = item.toJSON();

				if (data.term) {
					data.current = data.term === currentSearch;
					data.time_ago = humanized_time_span(data.time);
					return tpl(data);
				}

				return '';
			});

			searches = _.unique(searches, true);
			html = searches.join('');

			if (html === '') {
				html = '<li class="disabled"><a tabindex="-1" href="#">No recent searches.</li>';
			}

			this.recentSearchesElement.html(html);
		}
	});
});