define([
	'jquery',

	'controllers/base',

	'models/app',
	'models/search',

	'collections/searches',
	'collections/results',

	'views/results',
	'views/searches',
	'views/search',
	'views/visualisation'
], function($, Controller, app, Search, Searches, Results, ResultsView, RecentSearchesView, SearchView, VisualisationView) {
	return function() {
		var update,
			titlePattern = 'Popularity Contest - Searching for "{{term}}"',
			recentSearches,
			searches = new Searches(),
			results = window.results = new Results(),
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
			visualisation = SearchController.addView(VisualisationView, {}, '[data-widget="visualisation"]');

		//Only instantiate recentSearches if localStorage is supported
		if (window.localStorage) {
			recentSearches = SearchController.addView(RecentSearchesView, {
				collection: searches,
				currentSearch: function() {
					return app.get('currentSearch');
				}
			}, '[data-widget="recent-searches"]');
		}

		update = function(term) {
			var dfd = $.Deferred(),
				currentTerm = app.get('currentSearch'),
				search;

			if (term) {
				searchForm.trigger('updateVal', term);
				app.set('currentSearch', term);
				search = new Search({term: decodeURIComponent(term)});
				searches.add(search);

				$('[data-widget="visualisation"]').removeClass('hide');
				$('[data-widget="results"]').removeClass('hide');
				$('[data-widget="first-run"]').addClass('hide');

				window.document.title = titlePattern.replace('{{term}}', term);

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
				$('[data-widget="first-run"]').removeClass('hide');
				$('[data-widget="visualisation"]').addClass('hide');
				$('[data-widget="results"]').addClass('hide');
			}

			return dfd;
		};

		searchForm.on('search', update);
		searches.fetch();

		return SearchController;
	};
});