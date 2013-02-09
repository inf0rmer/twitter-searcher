define([
	'use!backbone'
], function(Backbone) {

	function time() {
		return new Date().getTime();
	}

	return Backbone.Model.extend({
		defaults: function() {
			return {
				time: time()
			};
		},

		update: function() {
			this.set('time', time());
		}
	});
});