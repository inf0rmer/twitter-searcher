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

		_selected: false,

		initialize: function() {
			this.bindTo(this.model, 'change', this.render);
			this.bindTo(this.model, 'remove', this.destroy);

			this.bindTo(this.model, 'selected', function() {
				this._setSelected();
			});
			this.bindTo(this.model, 'unselected', function() {
				this._unsetSelected();
			});
		},

		_setSelected: function() {
			this._selected = true;
			this.$el.addClass('selected');
		},

		_unsetSelected: function() {
			this._selected = false;
			this.$el.removeClass('selected');
		},

		toggleSelected: function() {
			var selected = this._selected;

			if (selected) {
				this.model.trigger('unselected');
			} else {
				this.model.trigger('selected');
			}
		}
	});
});