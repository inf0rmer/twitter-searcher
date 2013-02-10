define([
	'collections/results'
], function(Results){
	describe('Search Results Collection', function() {
		var results, data;

		beforeEach(function() {
			results = new Results();
			data = { data : { term : 'foo bar' } };

			results.term = 'foo bar';

			results.url = function() {
				return window.location.protocol + '//' + window.location.hostname + '/test/fixtures/search.json';
			};
		});

		it("should trigger a fetching event when fetching", function() {
			var flag;

			results.on('fetching', function() {
				flag = true;
			});

			results.fetch(data);
			expect(flag).to.be.ok();
		});

		it("should trigger a change event when the fetch is complete", function(done) {
			var flag;

			this.timeout(5000);

			results.on('change', function() {
				flag = true;
			});

			results.fetch(data).then(function() {
				expect(flag).to.be.ok();
				done();
			});
		});
	});
});