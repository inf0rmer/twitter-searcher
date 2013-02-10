define([
	'use!backbone',
	'models/result',
	'views/result'
], function(Backbone, Result, ResultView, undef){
	describe('Result View', function() {
		var el, result, resultItem, currentSearch;

		beforeEach(function() {
			el = $('#test').empty();
			result = new Result();
			resultItem = new ResultView({model: result}).render().placeAt(el);
		});

		afterEach(function(){
			$('#test').empty();
		});

		it('should create the component', function() {
			expect(el.find('.result-item').length).to.be(1);
		});

		it('should re-render on model change', function() {
			var flag = false,
				V = ResultView.extend({
					render: function() {
						flag = true;
						return this;
					}
				}),
				view = new V({model:result});

			expect(view.model).to.be(result);
			result.set('from_user', 'substack');
			expect(flag).to.be(true);
		});

		it('should set the _selected property on its model to "true" after "toggleSelected" is called once', function() {
			resultItem.toggleSelected();
			expect(resultItem.model._selected).to.be(true);
		});

		it('should announce a "selected" event after "toggleSelected" is called once', function() {
			var flag = false;

			resultItem.on('selected', function() {
				flag = true;
			});

			resultItem.toggleSelected();
			expect(flag).to.be(true);
		});

		it('should set a "selected" class on its element after "toggleSelected" is called once', function() {
			resultItem.toggleSelected();
			expect(resultItem.$el.hasClass('selected')).to.be(true);
		});

		it('should set the _selected property on its model to "false" after "toggleSelected" is called twice', function() {
			resultItem.toggleSelected();
			resultItem.toggleSelected();
			expect(resultItem.model._selected).to.be(false);
		});

		it('should announce a "unselected" event after "toggleSelected" is called twice', function() {
			var flag = false;

			resultItem.on('unselected', function() {
				flag = true;
			});

			resultItem.toggleSelected();
			resultItem.toggleSelected();
			expect(flag).to.be(true);
		});

		it('should remove the "selected" class on its element after "toggleSelected" is called twice', function() {
			resultItem.toggleSelected();
			resultItem.toggleSelected();
			expect(resultItem.$el.hasClass('selected')).to.be(false);
		});
	});
});