define([
	'use!underscore',
	'jquery',
	'models/user',
	'views/base',
	'views/resultDetail'
], function(_, $, User, View, ResultDetailView) {
	return View.extend({
		template: 'js/src/views/templates/visualisation.template',

		tagName: 'section',

		elements: ['message', 'resultHolder', 'reset'],

		events: {
			'click .js-reset': 'reset'
		},

		results: [],

		_resultViews: [],

		initialize: function() {
			this.bindTo(Backbone, 'result/selected', this.addResult);
			this.bindTo(Backbone, 'result/unselected', this.removeResult);

			this.bindTo(Backbone, 'result/selected result/unselected', this.layoutSubviews);

			this.results = [];
			this._resultViews = [];

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
			this._addResultView(model);
		},

		removeResult: function(model) {
			this.results = _.reject(this.results, function(m) {
				// Let the model know it was removed
				if (m.cid === model.cid) {
					//Backbone.trigger('result/unselected', model);
					model.trigger('unselected');
					return true;
				}
			});

			this._updateCounter();
			this._removeResultView(model);
		},

		reset: function(evt) {
			if (evt) {
				evt.preventDefault();
			}
			_.each(this.results, _.bind(this.removeResult, this));
		},

		layoutSubviews: function() {
			console.log('laying out subviews...');
			_.each(this._resultViews, function() {
				console.log(arguments);
			});
		},

		_updateCounter: function() {
			var tpl = window.JST['js/src/views/templates/visualisationCounter.template'];
			this.messageElement.html(tpl(this.serialize()));
		},

		_addResultView: function(model) {
			var view = new ResultDetailView({
				model: new User({
					screen_name: model.get('from_user')
				}),
				tweet_created_at: model.get('created_at'),
				tweet_model_cid: model.cid,
				tweet_text: model.get('text')
			});

			// Add to views cache array
			this._resultViews.push(view);

			// Attach to element
			this.resultHolderElement.append(view.el);
		},

		_removeResultView: function(model) {
			var self = this;
			this._resultViews = _.reject(this._resultViews, function(view) {
				// Let's also destroy the view
				if (model.cid === view.options.tweet_model_cid) {
					view.destroy();
					return true;
				}

				return false;
			});
		},

		destroy: function() {
			this.reset();

			// Reset is not guaranteed to clean up views without tweet_model_cid set
			_.invoke(this._resultViews, 'destroy');
			this._resultViews = [];

			return View.prototype.destroy.call(this, arguments);
		}
	});
});