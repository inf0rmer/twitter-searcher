var tests = [
	'views/templates/templates',

	'../../test/models/app',
	'../../test/models/result',

	'../../test/collections/searches',
	'../../test/collections/results',

	'../../test/controllers/base',
	'../../test/controllers/search',

	'../../test/views/base',
	'../../test/views/search',
	'../../test/views/searches',
	'../../test/views/results',
	'../../test/views/result',
	'../../test/views/visualisation'
];

require(tests, function() {
	mocha.run();
});