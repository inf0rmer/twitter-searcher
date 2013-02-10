define([
	'models/app'
], function(app, undef){
	describe('App model', function() {
		it('Should have a currentSearch attribute', function() {
			expect(app.get('currentSearch')).not.to.be(undef);
		});
	});
});