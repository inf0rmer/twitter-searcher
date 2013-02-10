define([
	'models/result'
], function(Result, undef){
	describe('Result model', function() {
		var result;

		beforeEach(function() {
			result = new Result();
		});

		it('Should have a created_at attribute', function() {
			expect(result.get('created_at')).not.to.be(undef);
		});

		it('Should have a from_user attribute', function() {
			expect(result.get('from_user')).not.to.be(undef);
		});

		it('Should have a from_user_id attribute', function() {
			expect(result.get('from_user_id')).not.to.be(undef);
		});

		it('Should have a from_user_name attribute', function() {
			expect(result.get('from_user_name')).not.to.be(undef);
		});

		it('Should have a profile_image_url attribute', function() {
			expect(result.get('profile_image_url')).not.to.be(undef);
		});

		it('Should have a profile_image_url_https attribute', function() {
			expect(result.get('profile_image_url_https')).not.to.be(undef);
		});

		it('Should have a source attribute', function() {
			expect(result.get('source')).not.to.be(undef);
		});

		it('Should have a text attribute', function() {
			expect(result.get('text')).not.to.be(undef);
		});

		it('Should trigger an app-wide event when it is selected', function() {
			var flag = false;
			Backbone.on('result/selected', function(model) {
				if (model.cid === result.cid) {
					flag = true;
				}
			});

			result.trigger('selected');

			expect(flag).to.be(true);
		});

		it('Should trigger an app-wide event when it is unselected', function() {
			var flag = false;
			Backbone.on('result/unselected', function(model) {
				if (model.cid === result.cid) {
					flag = true;
				}
			});

			result.trigger('unselected');

			expect(flag).to.be(true);
		});
	});
});