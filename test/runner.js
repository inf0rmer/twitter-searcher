var tests = [
	/*
	'../../test/views/base',
	'../../test/views/searchForm',
	'../../test/views/results',
	'../../test/views/recentSearches',

	'../../test/collections/searches',
	'../../test/collections/searchData',

	'../../test/models/app',
	'../../test/models/search',
	*/
	'../../test/controllers/base',
	'../../test/controllers/search'
];

require(tests, function() {
	mocha.run();
});