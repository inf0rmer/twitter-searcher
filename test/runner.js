var tests = [
	'../../test/models/app',
	'../../test/models/result',

	'../../test/collections/results',

	'../../test/controllers/base',
	'../../test/controllers/search',

	'../../test/views/base',
	'../../test/views/search',
	'../../test/views/results',
	'../../test/views/result'
];

require(tests, function() {
	mocha.run();
});