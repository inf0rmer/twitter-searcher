define([
	'use!underscore',
	'jquery',
	'views/base'
], function(_, $, View) {
	return View.extend({
		template: 'js/src/views/templates/search.template',

		elements : [ 'input', 'submit' ],

		events: {
			'submit .form-search': '_search'
		},

		_firstRun: true,

		initialize: function() {
			_.bindAll(this, 'enable');
			this.bindTo(this, 'updateVal', this._updateVal);
		},

		afterRender: function() {
			// Focus input on first run
			if (this._firstRun) {
				this._firstRun = false;
				setTimeout(_.bind(function(){
					this.inputElement.focus();
				}, this), 0);
			}
		},

		_search: function(evt) {
			evt.preventDefault();

			if (this.disabled) {return;}

			var term = $.trim(this.inputElement.val());

			if (!term) {return;}

			this._disable();
			setTimeout(_.bind(function(){
				this.inputElement.blur();
			}, this), 0);
			this.trigger('search', term);
		},

		enable: function() {
			this.disabled = false;
			this.submitElement.removeAttr('disabled');
		},

		_disable: function() {
			this.disabled = true;
			this.submitElement.attr('disabled', true);
		},

		_updateVal: function(term) {
			if (!term) {return;}
			this.inputElement.val(decodeURIComponent(term));
		}
	});
});