define([
	'use!backbone',
	'views/base'
], function(Backbone, View){
	describe('Base View', function() {
		var view, el, model;

		beforeEach(function() {
			$('#test').remove();
			el = $("<div id='test'></div>").appendTo(document.body);
			view = new View();
			model = new Backbone.Model();
		});

		it("should have a template by default", function() {
			expect(view.template).to.be.a('string');
		});

		describe('events', function() {
			it('should be able to trigger events', function() {
				var flag = false;

				view.on('foo', function() {
					flag = true;
				});

				view.trigger('foo');

				expect(flag).to.be(true);
			});
		});

		describe('render', function(){
			it("should render the template to the component's element", function(){
				view.render();
				expect(view.$el.html()).to.be(view.template);
			});

			it('should be chainable', function() {
				var returnable = view.render();
				expect(returnable).to.be(view);
			});

			it('should call the afterRender method', function() {
				var flag = false,
					V = View.extend({
						afterRender: function() {
							flag = true;
						}
					});
				view = new V().render();

				expect(flag).to.be(true);
			});

			it('should set up named properties for elements', function() {
				var V = View.extend({
					elements: ['smooth', 'criminal'],
					template: '<div><article class="js-smooth"><footer class="js-criminal"></footer></article></div>'
				});

				view = new V().render();

				expect(view.smoothElement).to.be.ok();
				expect(view.smoothElement[0].nodeName.toLowerCase()).to.be('article');
				expect(view.smoothElement.hasClass('js-smooth')).to.be(true);

				expect(view.criminalElement).to.be.ok();
				expect(view.criminalElement[0].nodeName.toLowerCase()).to.be('footer');
				expect(view.criminalElement.hasClass('js-criminal')).to.be(true);
			});
		});

		describe('placeAt', function(){
			it('should place the component into a node', function() {
				expect(el.children().length).to.be(0);

				var returnable = view.placeAt(el);
				expect(el.children().length).to.be(1);
			});

			it('should be chainable', function(){
				var returnable = view.placeAt(el);
				expect(returnable).to.be(view);
			});

			it('should append the component by default', function(){
				el.html('<div class="smooth"></div>');
				view.placeAt(el);

				var children = el.children();
				expect(children.length).to.be(2);
				expect(children[0].className).to.contain('smooth');
				expect(children[1]).to.be(view.el);
			});

			it('should prepend the component if the position argument is "first"', function(){
				el.html('<div class="smooth"></div>');
				view.placeAt(el, 'first');

				var children = el.children();
				expect(children.length).to.be(2);
				expect(children[0]).to.be(view.el);
				expect(children[1].className).to.contain('smooth');
			});

			it('should replace the original contents of the destination if the position argument is "only"', function(){
				el.html('<div class="smooth"></div>');
				view.placeAt(el, 'only');

				var children = el.children();
				expect(children.length).to.be(1);
				expect(children[0]).to.be(view.el);
			});
		});

		describe('bindTo', function(){
			it('should bind to a model event', function(){
				var flag = false;

				view.bindTo(model, 'evt', function(){
					flag = true;
				});

				model.trigger('evt');

				expect(flag).to.be(true);
			});

			it('should return an object with an unbind method', function(){
				var flag = false,
					binding = view.bindTo(model, 'evt', function(){
						flag = true;
					});

				binding.unbind();
				model.trigger('evt');
				expect(flag).to.be(false);
			});
		});

		describe('unbind', function(){
			it('should unbind all bound events', function(){
				var flag = false;

				view.bindTo(model, 'evt', function(){
					flag = true;
				});

				view.unbind();
				model.trigger('evt');
				expect(flag).to.be(false);
			});
		});

		describe('destroy', function(){
			it('should call unbind', function() {
				var unbound = false,
					originalUnbind = view.unbind;

				view.unbind = function() {
					originalUnbind.call(view, arguments);
					unbound = true;
				};

				view.destroy();
				expect(unbound).to.be(true);

			});

			it('should remove the view from the DOM', function(){
				view.placeAt(el);
				expect(el.children().length).to.be(1);
				view.destroy();
				expect(el.children().length).to.be(0);
			});
		});
	});
});