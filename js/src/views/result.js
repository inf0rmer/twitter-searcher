define([
	'use!underscore',
	'jquery',
	'views/base',
	'text!views/templates/result.template'
], function(_, $, View, template) {
	return View.extend({
		template: template,

		element: 'li',

		className: 'result-item',

		events: {
			'click': 'toggleSelected'
		},

		initialize: function() {
			this.bindTo(this.model, 'change', this.render);
		},

		_setSelected: function() {
			this.model._selected = true;
			this.$el.addClass('selected');
			this.trigger('selected', this.model);
		},

		_unsetSelected: function() {
			this.model._selected = false;
			this.$el.removeClass('selected');
			this.trigger('unselected', this.model);
		},

		toggleSelected: function() {
			var selected = this.model._selected;

			if (selected) {
				this._unsetSelected();
			} else {
				this._setSelected();
			}
		}
	});
});