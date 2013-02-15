define([
	'use!backbone',
	'views/search'
], function(Backbone, SearchView, undef){
	describe('Search View', function() {
		var el, searchForm, currentSearch;

		beforeEach(function() {
			el = $('#test').empty();
			searchForm = new SearchView({}).render().placeAt(el);
		});

		afterEach(function(){
			$('#test').empty();
		});

		it('should create the component', function(){
			expect(el.find('.form-search').length).to.be(1);
		});

		it('should announce the form submission', function(done){
			var theTerm;

			searchForm.enable();

			searchForm.on('search', function(term){
				theTerm = term;
				done();
			});

			el.find('.js-input').val('meerkats are awesome');
			el.find('.form-search').submit();
			expect(theTerm).to.be('meerkats are awesome');
		});

		it('should not announce an empty search', function() {
			var theTerm;

			searchForm.on('search', function(term){
				theTerm = term;
			});

			el.find('.js-input').val('');
			el.find('.form-search').submit();
			expect(theTerm).to.be(undef);
		});

		it('should disable the submit element when searching', function() {
			el.find('.js-input').val('meerkats are awesome');
			el.find('.form-search').submit();
			expect(el.find('.js-submit').attr('disabled')).to.be.ok();
		});

		it('should enable the submit element when the enable method is called', function(){
			el.find('.js-input').val('meerkats are awesome');
			el.find('.form-search').submit();
			expect(el.find('.js-submit').attr('disabled')).to.be.ok();
			searchForm.enable();
			expect(el.find('.js-submit').attr('disabled')).not.to.be.ok();
		});
	});
});