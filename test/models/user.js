define([
	'models/user'
], function(User) {
	describe('User model', function() {
		var user;

		beforeEach(function() {
			user = new User({
				screen_name: 'inf0rmer'
			});

			user.url = function() {
				return window.location.protocol + '//' + window.location.hostname + '/test/fixtures/user.json';
			};
		});

		it('Should throw an error when initialized without a screen_name attribute', function() {
			expect(function() {
				new User({});
			}).to.throwError();
		});

		it('should trigger a change event after fetching', function(done) {
			var flag;

			this.timeout(5000);

			user.on('change', function() {
				flag = true;
			});

			user.fetch().then(function() {
				expect(flag).to.be.ok();
				done();
			});
		});

		it('should have a followers_count after fetching', function(done) {
			this.timeout(5000);

			user.fetch().then(function() {
				expect(user.get('followers_count')).to.be.ok();
				done();
			});
		});
	});
});