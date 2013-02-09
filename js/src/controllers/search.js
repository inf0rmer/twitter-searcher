define([
	'jquery',

	'controllers/base',

	'models/app',
	'models/search',

	'collections/searches',
	'collections/results',

	'views/results',
	'views/search'
], function($, Controller, app, Search, Searches, Results, ResultsView, SearchView) {
	return function() {
		var update,
			searches = new Searches(),
			results = new Results(),
			SearchController = new Controller({
				name: 'search',
				update: function(params) {
					return update(params.term);
				},
				searches: searches,
				results: results,
				app: app
			}),

			searchForm = SearchController.addView(SearchView, {}, '[data-widget="search"]'),
			searchResults = SearchController.addView(ResultsView, {
				collection: results,
				currentSearch: function() {
					return app.get('currentSearch');
				}
			}, '[data-widget="results"]');

		update = function(term) {
			var dfd = $.Deferred(),
				currentTerm = app.get('currentSearch'),
				search;

			app.set('currentSearch', term);

			if (term) {
				searchForm.trigger('updateVal', term);
				search = new Search({term: term});

				results.fetch({
					data: {
						term: term
					}
				})
				.then(dfd.resolve, dfd.reject)
				.always(searchForm.enable);

				app.router.navigate('search/' + term);
			} else {
				dfd.resolve();
			}

			return dfd;
		};

		searchForm.on('search', update);

		return SearchController;
	};
});