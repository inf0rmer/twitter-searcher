define([
	'use!backbone',
	'views/searches'
], function(Backbone, RecentSearches) {
	describe('Recent Searches', function() {
		var el, rs, data, searches, Searches,
			search = {
				term : 'smooth'
			};

		beforeEach(function() {
			el = $('#test').empty();

			Searches = Backbone.Collection.extend({
				comparator: function() {
					return -1;
				}
			});

			searches = new Searches([
				{ term: 'smooth' },
				{ term: 'criminal' }
			]);

			rs = new RecentSearches({
				collection: searches,
				currentSearch: function() {
					return 'smooth';
				}
			}).render().placeAt(el);
		});

		afterEach(function(){
			rs.destroy();
		});

		it('should create the component', function() {
			expect(el.find('.js-recentSearches').length).to.be(1);
		});

		it('should display the recent searches', function() {
			expect(el.html()).to.contain('smooth');
			expect(el.html()).to.contain('criminal');
		});

		it('should mark the current search term', function() {
			expect(el.find('li.active').text()).to.contain('smooth');
		});

		it('should update when there is a new search', function() {
			expect(el.html()).not.to.contain('hurricanes');
			rs.options.currentSearch = function() { return 'hurricanes'; };
			searches.add({ term: 'hurricanes' });
			expect(el.html()).to.contain('hurricanes');
			expect(el.find('li.active').text()).to.contain('hurricanes');
		});

		it('should thrown an error when currentSearch is not a function', function() {
			expect(function() {
				new RecentSearches({
					collection: searches
				});
			}).to.throwError();

			expect(function() {
				new RecentSearches({
					collection: searches,
					currentSearch: 'smooth'
				});
			}).to.throwError();
		});

		it('should throw error if a collection is not defined', function() {
			expect(function() {
				new RecentSearches({
					currentSearch: function() {}
				});
			}).to.throwError();
		});

		it('should show a message if there are no recent searches', function() {
			rs.destroy();
			rs = new RecentSearches({
				currentSearch: function() {},
				collection: new Searches([])
			}).render().placeAt(el);

			expect(el.find('li').length).to.be(1);
			expect(el.find('li').html()).to.contain("No recent searches");
		});

	});
});