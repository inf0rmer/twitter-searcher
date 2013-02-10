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

		initialize: function() {
			this.bindTo(this.model, 'change', this.render);
		}
	});
});