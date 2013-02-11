define([
	'jquery',
	'models/user',
	'views/resultDetail'
], function($, User, ResultDetailView) {
	describe('Result Detail View', function() {
		var el, user, resultDetail;

		beforeEach(function() {
			el = $('#test').empty();
			user = new User({
				screen_name: "inf0rmer"
			});
			resultDetail = new ResultDetailView({
				model: user
			}).render().placeAt(el);
		});

		afterEach(function(){
			resultDetail.destroy();
			$('#test').empty();
		});

		it('should create the component', function() {
			expect(el.find('.result-detail').length).to.be(1);
		});

	});
});