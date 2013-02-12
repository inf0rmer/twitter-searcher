define([
	'use!underscore',
	'jquery',
	'views/base',
	'lib/humanized_time_span'
], function(_, $, View) {
	return View.extend({
		template: 'js/src/views/templates/result.template',

		tagName: 'li',

		className: 'result-item',

		events: {
			'click': 'toggleSelected'
		},

		_selected: false,

		// Override the serialize function so that we can transform the data
		serialize: function() {
			var data = View.prototype.serialize.call(this, arguments);

			data.time_ago = humanized_time_span(new Date(data.created_at));

			return data;
		},

		initialize: function() {
			this.bindTo(this.model, 'change', this.render);
			this.bindTo(this.model, 'remove', this.destroy);

			this.bindTo(this.model, 'selected', this._setSelected);
			this.bindTo(this.model, 'unselected', this._unsetSelected);
		},

		_setSelected: function() {
			this._selected = true;
			this.$el.addClass('selected');
		},

		_unsetSelected: function() {
			this._selected = false;
			this.$el.removeClass('selected');
		},

		toggleSelected: function(evt) {
			var selected = this._selected;

			if (selected) {
				this.model.trigger('unselected', {
					broadcast: true
				});
			} else {
				this.model.trigger('selected', {
					broadcast: true
				});
			}

			if (evt && evt.preventDefault) {
				evt.preventDefault();
			}
		}
	});
});