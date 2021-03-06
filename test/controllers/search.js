define([
	'controllers/search'
], function(Search) {
	// Because we're using JSONP we need to ignore globals
	mocha.options.ignoreLeaks = true;

	describe("Controller Search", function() {
		var s, el, mainbar, sidebar, navigatedTo;

		beforeEach(function() {
			navigatedTo = false;

			$('#test').remove();

			el = $("<div id='test'></div>").appendTo(document.body);
			mainbar = $('<div data-widget="search" class="pull-left"></div>').appendTo(el);
			sidebar = $('<div class="span3" data-widget="results"></div>').appendTo(el);

			s = new Search();
			s.app.router = {
				navigate : function(dest) {
					navigatedTo = dest;
				}
			};

			s.results.url = function() {
				return window.location.protocol + '//' + window.location.hostname + '/test/fixtures/search.json';
			};
		});

		afterEach(function() {
			$('#test').remove();
		});

		it("should set up the page", function() {
			expect($('.js-list').length).to.be(1);
			expect($('.form-search').length).to.be(1);
		});

		it("should update the page when the search form announces a search", function(done) {
			var searchFormEl = $('.form-search').parent(),
				searchForm = _.filter(s.views, function(v) {
					return v.$el[0] === searchFormEl[0];
				})[0];

			s.results.on('change', function() {
				expect(navigatedTo).to.be('search/kittens');
				done();
			});

			searchForm.trigger('search', 'kittens');
		});

		it('should update the page title when the search form announces a search', function(done) {
			var searchFormEl = $('.form-search').parent(),
				searchForm = _.filter(s.views, function(v) {
					return v.$el[0] === searchFormEl[0];
				})[0];

			s.results.on('change', function() {
				expect(window.document.title).to.be('Popularity Contest - Searching for "kittens"');
				done();
			});

			searchForm.trigger('search', 'kittens');
		});

		describe("update", function() {
			it("should update the page using the new search term", function(done) {
				var dfd = s.update({ term : 'testing' });

				dfd.then(function() {
					expect($('.form-search').find('.js-input').val()).to.be('testing');
					expect(navigatedTo).to.be('search/testing');
					done();
				});
			});
		});
	});
});