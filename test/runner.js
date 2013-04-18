var tests = [
	'views/templates/templates',

	'../../test/models/app',
	'../../test/models/result',
	'../../test/models/user',

	'../../test/collections/searches',
	'../../test/collections/results',

	'../../test/controllers/base',
	'../../test/controllers/search',

	'../../test/views/base',
	'../../test/views/search',
	'../../test/views/searches',
	'../../test/views/results',
	'../../test/views/result',
	'../../test/views/visualisation',
	'../../test/views/resultDetail'
];

require(tests, function() {
	console.log('run');
	mocha.run();
});