define([
	'collections/results'
], function(Results, undef){
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

		it('should trigger a loadingMore event when fetching the next page and there is a _nextPage', function(done) {
			var flag;

			this.timeout(5000);

			results.on('loadingMore', function() {
				flag = true;
			});

			results._nextPage = results.url();

			results.next(data).then(function() {
				expect(flag).to.be.ok();
				done();
			});
		});

		it('should throw an error when fetching the next page and _nextPage is undefined', function() {
			results._nextPage = undef;

			expect(function() {
				results.next(data);
			}).to.throwError();
		});
	});
});