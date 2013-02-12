define([
	'views/base'
], function(View) {
	return View.extend({
		template: 'js/src/views/templates/error.template',

		className: 'alert alert-danger'
	});
});