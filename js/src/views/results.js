define([
	'use!underscore',
	'jquery',
	'views/base',
	'text!views/templates/results.template',
	'text!views/templates/result.template'
], function(_, $, View, template, itemTemplate) {
	return View.extend({
		template: template,

		elements: ['list'],

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

			this.itemTemplate = _.template(itemTemplate);
		},

		loadMore: function(evt) {
			evt.preventDefault();
			this.collection.next();
		},

		_empty: function() {
			this.listElement.html('<li class="nav-header loading">Loading &hellip;</li>');
		},

		_addOne: function(model) {
			var tpl = this.itemTemplate,
			html = tpl(model.toJSON());

			this.listElement.append(html);
		},

		_addAll: function() {
			var tpl = this.itemTemplate,
			html = '<li class="nav-header">Results</li>';

			this.listElement.find('.loading').remove();

			this.collection.each(function(item) {
				var data = item.toJSON();
				html += tpl(data);
			});

			this.listElement.append(html);

			if (this.collection._nextPage) {
				this.listElement.find('[data-action="load-more"]').show();
			}
		}
	});
});