define([
  'use!backbone',
  'controllers/search'
], function(B, Search) {
	var Router,
		currentPage;

	function cleanup() {
		if (currentPage && currentPage.destroy && _.isFunction(currentPage.destroy)) {
			currentPage.destroy();
		}
	}

	Router = B.Router.extend({
		routes : {
			'' :              'search',
			'search/:term' :  'search',
			'empty' :         'empty'
		},

		search : function(term) {
			if (!currentPage || currentPage.name !== 'search') {
				cleanup();
				currentPage = new Search();
			}

			currentPage.update({ term : term });
		},

		empty : function() {
			cleanup();

			currentPage = {
				destroy : function() { }
			};
		}
	});

	return Router;
});