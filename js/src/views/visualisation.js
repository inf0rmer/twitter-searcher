define([
	'use!underscore',
	'jquery',
	'views/base'
], function(_, $, View) {
	return View.extend({
		template: 'js/src/views/templates/visualisation.template',

		tagName: 'section',

		elements: ['message'],

		results: [],

		initialize: function() {
			this.bindTo(Backbone, 'result/selected', this.addResult);
			this.bindTo(Backbone, 'result/unselected', this.removeResult);

			this.results = [];

			this.options.limit = this.options.limit || 5;
		},

		afterRender: function() {
			this._updateCounter();
		},

		serialize: function() {
			var data = View.prototype.serialize.call(this, arguments);
			data.limit = this.options.limit;

			return data;
		},

		addResult: function(model) {
			var toUnselect;

			//Test for duplicates
			var isDupe = (_.where(this.results, { cid: model.cid }).length) ? true : false;

			if (isDupe) {
				throw new Error('Trying to add a duplicate result, failing!');
			}

			this.results.unshift(model);

			if (this.results.length > this.options.limit) {
				toUnselect = this.results.pop();
			}

			if (!_.isUndefined(toUnselect)) {
				Backbone.trigger('result/unselected', toUnselect);
				toUnselect.trigger('unselected');
			}

			this._updateCounter();
		},

		removeResult: function(model) {
			this.results = _.reject(this.results, function(m) {
				return m.cid === model.cid;
			});

			this._updateCounter();
		},

		_updateCounter: function() {
			var tpl = window.JST['js/src/views/templates/visualisationCounter.template'];
			this.messageElement.html(tpl(this.serialize()));
		}
	});
});