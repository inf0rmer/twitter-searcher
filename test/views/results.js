define([
	'use!backbone',
	'views/results',
	'collections/results'
], function(Backbone, ResultsView, Results, undef){
	describe('Results View', function() {
		var el, resultsView, results;

		beforeEach(function() {
			el = $('#test').empty();
			results = new Results();
			resultsView = new ResultsView({collection: results}).render().placeAt(el);
		});

		afterEach(function(){
			$('#test').empty();
		});

		it('should create the component', function() {
			expect(el.find('.js-list').length).to.be(1);
		});

		it('should show an error view when the request fails', function(done) {
			results.url = function() {
				return '/proxy.php?url=http://api.twitter.com/1/users/showasd.json';
			};

			this.timeout(5000);

			results.fetch()
			.always(function(){
				expect(resultsView.$el.find('.alert-danger').length).to.be(1);
				done();
			});
		});
	});
});