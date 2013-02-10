define([
	'collections/searches'
], function(Searches) {
	describe('Searches Collection', function() {
		var s;

		beforeEach(function() {
			window.localStorage.removeItem('searchesTest');
			Searches.prototype.storeKey = 'searchesTest';
			s = new Searches();
			s.fetch();
		});

		afterEach(function() {
			window.localStorage.removeItem('searchesTest');
		});

		it('should sort items in reverse chronological order according to its "time" property', function() {
			s.add({term: 'smooth', time: 123});
			s.add({term: 'criminal', time: 512});
			s.add({term: 'is a cool song', time: 356});

			expect(s.first().get('term')).to.be('criminal');
		});

		it('should store items in localStorage', function() {
			s.add({term: 'smooth', time: 123});
			s.add({term: 'criminal', time: 512});
			s.add({term: 'is a cool song', time: 356});

			expect(window.JSON.parse(window.localStorage.getItem('searchesTest')).length).to.be(3);
		});

		it('should fetch from localStorage', function() {
			window.localStorage.setItem('searchesTest', window.JSON.stringify([{term: 'smooth', time: 123}]));

			s.fetch();
			expect(s.where({term: 'smooth'}).length).to.be(1);
		});

		it('should not add a search if the term is a duplicate', function() {
			s.add({term: 'smooth', time: 123});
			s.add({term: 'smooth', time: 1248});

			expect(s.length).to.be(1);
		});

	});
});