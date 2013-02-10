define([
	'collections/results'
], function(Results){
	describe('Search Results Collection', function() {
		var results, data;

		beforeEach(function() {
			results = new Results();
			data = { data : { term : 'foo bar' } };

			results.term = 'foo bar';
		});

		it("should return a URI-encoded URL", function() {
			expect(results.url()).to.be('http://search.twitter.com/search.json?q='+ encodeURIComponent('foo bar') +'&rpp=10&page=1&include_entities=false&result_type=mixed');
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