/* Adapted from https://github.com/rmurphey/srchr-demo/blob/master/app/views/base.js */

define([
	'use!backbone',
	'use!underscore',
	'jquery'
], function(Backbone, _, $) {
	var SuperView,
		tplCache = {};

	SuperView = Backbone.SuperView = Backbone.View.extend({
		template: '<div></div>',

		// ### 'elements'
		//
		// If you would like to store references to certain elements in your
		// template for later use, you can indicate those elements by doing *both*
		// of the following:
		//
		// - adding a classname beginning with 'js-' to the elements in your template
		// - listing the classname suffix in your view's 'elements' array
		//
		// For example, if your template contains the following:
		//
		//    '<div class="js-interesting"></div>'
		//
		// And your view's 'elements' array is:
		//
		//    '[ 'interesting' ]'
		//
		// Then your view will have a property 'interestingElement' that references
		// a jQuery object for the div.
		elements : [],

		// ### '_setupElements'
		//
		// The '_setupElements' method is a "private" method for storing references
		// to elements as indicated by the view's 'elements' property.
		_setupElements : function() {
			if (this.elements) {
				_.each(this.elements, function(c) {
					this[c + 'Element'] = this.$('.js-' + c).eq(0);
				}, this);
			}
		},

		// ### 'render'
		//
		// Once a view is created, it needs to be rendered. This default render
		// method fetches the template from the template cache (or generates the
		// template and stores it in the template cache if it is not found in the
		// cache) via the 'templatize' method, serializes the view's data via the
		// 'serialize' method, and then sets up any named elements that were
		// specified in the 'elements' property of the view.
		render: function() {
			var tpl = this.makeTemplate(),
				data = this.serialize();

			this.$el.html(tpl(data));
			this._setupElements();

			this.afterRender();

			return this;
		},

		// ### 'makeTemplate'
		//
		// The 'makeTemplate' method returns a template function generated from the
		// view's string 'template' property, or uses an existing template from the
		// template cache if one is already defined.
		makeTemplate: function() {
			if (!tplCache[this.template]) {
				tplCache[this.template] = _.template(this.template);
			}

			return tplCache[this.template];
		},

		// ### 'serialize'
		//
		// The 'serialize' method is responsible for taking the view's data and
		// preparing it to be used by the view's template. You can override or
		// extend this method as required in your individual view. By default, it
		// will use the model or collection assigned to the view as its data,
		// serializing it using the 'toJSON' method; if your view does not have
		// a model or collection, it will just return the view object itself.
		serialize: function() {
			if (this.model || this.collection) {
				return (this.model || this.collection).toJSON();
			}

			return this;
		},

		// ### 'placeAt'
		//
		// Once the view has been rendered, it still needs to be placed in the
		// document. The 'placeAt' method allows you to specify a destination for
		// the view; this destination can either be a jQuery object, a DOM node, or
		// a selector. The 'placeAt' method also optionally takes a position
		// argument, which determines how the object will be placed in the
		// destination node: as the first, last, or only child.
		placeAt: function(node, position) {
			position = position || 'last';

			var method = {
				'first'	: 'prepend',
				'last'	: 'append',
				'only'	: 'html'
			}[position] || 'append';

			$(node)[method](this.$el);

			this.afterPlaceAt();

			return this;
		},

		// ## Binding
		//
		// By default, a view's bindings to evented objects are not necessarily torn down
		// when a view is destroyed. These methods provide for the cleanup of these
		// bindings, preventing potential memory leaks.

		// ### 'bindTo'
		//
		// The 'bindTo' method allows a view to bind a function to an event on an
		// object. The bound function will always run in the context of the view.
		// The 'bindTo' method returns an object with an 'unbind' method, allowing
		// you to manually unbind a binding later if desired.
		bindTo : function(obj, evt, fn) {
			this._bindings = this._bindings || [];

			obj.bind(evt, fn, this);
			this._bindings.push(obj);

			return {
				unbind : function() {
					obj.off(evt, fn);
				}
			};
		},

		// ### 'unbind'
		//
		// The 'unbind' method unbinds all handlers that were bound with 'bindTo';
		// you can call it directly, or by calling the view's 'destroy' method,
		// which also removes the view from the document.
		unbind : function() {
			if (!this._bindings) { return; }

			_.each(this._bindings, function(b) {
				b.off(null, null, this);
			}, this);
		},

		// ### 'destroy'
		//
		// The 'destroy' method unbinds all handlers that were bound using
		// 'bindTo', and also calls the default 'remove' method.
		destroy : function() {
			this.unbind();
			this.remove();
		},

		// ## Lifecycle Methods
		//
		// These methods are stubs for implementation by your views. These methods
		// fire after their respective methods are complete.

		// ### 'afterRender'
		//
		// 'afterRender' fires just before the view's 'render' method returns. Do
		// things here that require the view's basic markup to be in place, but
		// that do NOT require the view to be placed in the document

		afterRender: function() {

		},

		// ### 'afterPlaceAt'
		//
		// 'afterPlaceAt' fires just before the view's 'placeAt' method returns. Do
		// things here that require the view to be placed in the document, such as
		// operations that require knowing the dimensions of the view.
		afterPlaceAt: function() {

		}
	});

	// Ability to use pre-compiled templates stored at 'window.JST'
	if (window.JST && _.isObject(window.JST)) {
		tplCache = _.extend(tplCache, window.JST);
	}

	return SuperView;
});