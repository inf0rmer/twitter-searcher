define([
	'jquery',

	'controllers/base',

	'models/app',
	'models/search',

	'collections/searches',
	'collections/results',

	'views/results',
	'views/searches',
	'views/search'
], function($, Controller, app, Search, Searches, Results, ResultsView, RecentSearchesView, SearchView) {
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
				collection: results
			}, '[data-widget="results"]'),
			recentSearches = SearchController.addView(RecentSearchesView, {
				collection: searches,
				currentSearch: function() {
					return app.get('currentSearch');
				}
			}, '[data-widget="search"]');

		update = function(term) {
			var dfd = $.Deferred(),
				currentTerm = app.get('currentSearch'),
				search;

			if (term) {
				searchForm.trigger('updateVal', term);
				app.set('currentSearch', term);
				search = new Search({term: decodeURIComponent(term)});
				searches.add(search);

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
		searches.fetch();

		return SearchController;
	};
});