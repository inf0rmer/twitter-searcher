define([
	'controllers/base',
	'views/base'
], function(C, View) {
	var el, V, destroyFlag;

	beforeEach(function() {
		destroyFlag = false;
		V = View.extend({ destroy : function() {
			destroyFlag = true;
		} });
		$('#test').remove();
		el = $("<div id='test'></div>").appendTo(document.body);
	});

	describe("Controller Base", function() {
		it("should create a controller", function() {
			var c = new C();
			expect(c.name).to.be.ok();
			expect(c.destroy).to.be.a('function');
			expect(c.update).to.be.a('function');
			expect(c.addView).to.be.a('function');
		});
	});

	describe("addView", function() {
		it("should provide a method for adding views", function() {
			expect(el.children().length).to.be(0);
			var c = new C();
			c.addView(V, {}, '#test');
			expect(el.children().length).to.be(1);
		});
	});

	describe("destroy", function() {
		it("should destroy views when the controller is destroyed", function() {
			var c = new C();
			c.addView(V, {}, '#test');
			c.destroy();
			expect(destroyFlag).to.be.ok();
			expect(c.views.length).to.be(0);
		});
	});
});