define([
	'use!underscore',
	'jquery',
	'views/base',
	'text!views/templates/search.template'
], function(_, $, View, template) {
	return View.extend({
		template: template,

		elements : [ 'input', 'submit' ],

		events: {
			'submit .form-search': '_search'
		},

		initialize: function() {
			_.bindAll(this, 'enable');
		},

		_search: function(evt) {
			evt.preventDefault();

			if (this.disabled) {return;}

			var term = $.trim(this.inputElement.val());

			if (!term) {return;}

			this._disable();
			this.trigger('search', term);
		},

		enable: function() {
			this.disabled = false;
			this.submitElement.removeAttr('disabled');
		},

		_disable: function() {
			this.disabled = true;
			this.submitElement.attr('disabled', true);
		}
	});
});