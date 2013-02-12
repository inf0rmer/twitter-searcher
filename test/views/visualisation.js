define([
	'models/result',
	'views/visualisation'
], function(Result, Visualisation) {
	describe('Visualisation View', function() {
		var el, visualisation;

		beforeEach(function() {
			el = $('#test').empty();
			visualisation = new Visualisation({}).render().placeAt(el);
		});

		afterEach(function(){
			visualisation.destroy();
			$('#test').empty();
		});

		it('should render the component', function() {
			expect(el.find('.result-holder').length).to.be(1);
		});

		it('should respond to the app-wide result/select event to add a model to its results array', function() {
			var aResult = new Result();
			Backbone.trigger('result/selected', aResult);
			expect(visualisation.results.length).to.be(1);
		});

		it('should respond to the app-wide result/unselect event to remove a model from its results array', function() {
			var aResult = new Result();

			Backbone.trigger('result/selected', aResult);
			expect(visualisation.results.length).to.be(1);

			Backbone.trigger('result/unselected', aResult);
			expect(visualisation.results.length).to.be(0);
		});

		it('should not add a duplicate result', function() {
			var aResult = new Result();
			Backbone.trigger('result/selected', aResult);

			expect(function() {
				Backbone.trigger('result/selected', aResult);
			}).to.throwError();
		});

		it('should have no more results than the value of its limit property', function() {
			visualisation.destroy();
			visualisation = new Visualisation({
				limit: 1
			}).render().placeAt(el);

			var aResult = new Result();
			var oResult = new Result();
			Backbone.trigger('result/selected', aResult);
			Backbone.trigger('result/selected', oResult);

			expect(visualisation.results.length).to.be(1);
		});

		it('should print its limit in the info message', function() {
			expect(el.find('.js-number').text()).to.contain(visualisation.options.limit);
		});

		it('should update the counter when a result is added', function() {
			var aResult = new Result();
			Backbone.trigger('result/selected', aResult);

			expect(el.find('.js-number').text()).to.contain(visualisation.options.limit - visualisation.results.length);
		});

		it('should update the counter when a result is removed', function() {
			var aResult = new Result();
			Backbone.trigger('result/selected', aResult);

			expect(el.find('.js-number').text()).to.contain(visualisation.options.limit - visualisation.results.length);

			Backbone.trigger('result/unselected', aResult);

			expect(el.find('.js-number').text()).to.contain(visualisation.options.limit - visualisation.results.length);
		});

		it('should show an alternate message on the counter when the limit is reached', function() {
			visualisation.destroy();
			visualisation = new Visualisation({
				limit: 1
			}).render().placeAt(el);

			var aResult = new Result();
			Backbone.trigger('result/selected', aResult);

			expect(el.find('.js-message').text()).to.contain('Now your tweets fight to the death!');
		});

		it('should clean up the results and _resultViews arrays when it is destroyed', function() {
			visualisation.destroy();
			expect(visualisation.results.length).to.be(0);
			expect(visualisation._resultViews.length).to.be(0);
		});

		it('should clean up the results and _resultViews arrays when the reset button is pressed', function() {
			visualisation.destroy();
			visualisation = new Visualisation({
				limit: 1
			}).render().placeAt(el);

			var aResult = new Result();
			Backbone.trigger('result/selected', aResult);

			expect(visualisation.results.length).to.be(1);
			expect(visualisation._resultViews.length).to.be(1);

			el.find('.js-reset').trigger('click');

			expect(visualisation.results.length).to.be(0);
			expect(visualisation._resultViews.length).to.be(0);

		});
	});
});