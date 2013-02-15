define([
	'use!underscore',
	'jquery',
	'models/user',
	'views/base',
	'views/resultDetail'
], function(_, $, User, View, ResultDetailView) {

	// Config
	var minDifferencePercent = 30,
		resultsPerColumn = 2,
		breakpoints = [
			{
				size: 20,
				className: 'small'
			},
			{
				size: 50,
				className: 'medium'
			},
			{
				size: 100,
				className: 'large'
			}
		];

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

			this.bindTo(Backbone, 'visualisation/layoutSubviews', this.layoutSubviews);

			this.results = [];
			this._resultViews = [];

			this.options.limit = this.options.limit || 5;

			$(window).on('resize', _.debounce(function() {
				Backbone.trigger('visualisation/layoutSubviews');
			}, 350));
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
			var	resultViewsLength = this._resultViews.length,
				mostPopularView,
				biggestFollowerCount,
				resultViews,
				columns,
				columnWidth = 100,
				holderHeight = this.resultHolderElement.height(),
				holderWidth = this.resultHolderElement.width(),
				biggestDifference = 0,
				css = [];

			// Bail out if there are no views
			if (!resultViewsLength) {
				return false;
			}

			// Get the view with the biggest follower_count
			mostPopularView = _.max(this._resultViews, function(view) {
				return view.model.get('followers_count');
			});

			biggestFollowerCount = mostPopularView.model.get('followers_count');

			resultViews = _.sortBy(this._resultViews, function(view) {
				return view.model.get('followers_count');
			});

			_.each(resultViews, function(view, index) {
				var followerCount,
					difference,
					height;

				followerCount = view.model.get('followers_count');
				difference =  Math.max(followerCount*100 / biggestFollowerCount, minDifferencePercent);

				if (difference > biggestDifference && difference < 100) {
					biggestDifference = difference;
				}

				css[index] = {
					height: difference,
					top: 0,
					opacity: 1
				};
			});

			resultViews.reverse();

			css = _.toArray(_.groupBy(css, function(style, index) {
				return Math.floor(index / resultsPerColumn);
			}));

			columns = css.length;

			columnWidth = columnWidth/columns;
			columnWidth = 100 - (20 * (css.length - 1));

			_.each(css, function(column, idx, theArray){
				var i,
					viewIndex,
					viewElement,
					item,
					view,
					prevItem,
					remainder = 100,
					heights,
					isSecondary = false,
					left;

				// Last column as special width
				if (idx+1 < theArray.length) {
					columnWidth = 20;
					isSecondary = true;
				}

				if (idx+1 === theArray.length) {
					columnWidth = 100 - (20 * (css.length - 1));
				}

				left = 20 * idx / 100 * holderWidth;

				for (i=0; i<column.length; i++) {
					item = column[i];
					prevItem = column[i-1];

					if (prevItem) {

						if (item.height === 100) {
							item.height -= prevItem.height;

							// In case they have the same number of followers
							if (prevItem.height === 100) {
								item.height = 50;
								prevItem.height = 50;
							}

							item.height = Math.max(item.height, minDifferencePercent);
						}

						item.top = (prevItem.height/100) * holderHeight;
					}

					remainder -= column[i].height;
				}

				// Redistribute percentages in each column to get to 100% while keeping proportion

				if (remainder !== 0) {
					for (i=0; i<column.length; i++) {
						item = column[i];

						item.height += remainder/column.length;

						if (item.height < minDifferencePercent) {
							item.height = minDifferencePercent;
						}

						if (item.height > 100 - minDifferencePercent) {
							item.height = 100 - minDifferencePercent;
						}

						if (item.top > 0) {
							item.top += remainder/column.length/100 * holderHeight;
						}
					}
				}

				//Apply styles
				for (i=0; i<column.length; i++) {
					viewIndex = i+idx;
					view = idx + viewIndex;

					viewElement = resultViews[view].$el;

					viewElement.removeClass('small medium large most-popular secondary');

					if (resultViews[view].model.get('followers_count') === biggestFollowerCount) {
						viewElement.addClass('most-popular');
					}

					if (isSecondary) {
						viewElement.addClass('secondary');
					}

					viewElement.css({
						width: columnWidth + '%',
						height: column[i].height + '%',
						left: left,
						top: column[i].top,
						opacity: column[i].opacity
					});

					// Loop through breakpoints to add a sizing class)
					for (var b=0; b<breakpoints.length; b++) {
						if (Math.min(column[i].height, columnWidth) <= breakpoints[b].size) {
							viewElement.addClass(breakpoints[b].className);
							break;
						}
					}
				}
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