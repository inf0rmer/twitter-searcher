define([
	'use!backbone'
], function(Backbone) {
	return Backbone.Model.extend({
		defaults: {
			"created_at": new Date(),
			"from_user": "inf0rmer",
			"from_user_id": 1,
			"from_user_name": "Bruno Abrantes",
			"profile_image_url": "https://si0.twimg.com/profile_images/2411700288/dj5tz2ytzf3i5sii3fd1.jpeg",
			"profile_image_url_https": "https://si0.twimg.com/profile_images/2411700288/dj5tz2ytzf3i5sii3fd1.jpeg",
			"source": "&lt;a href=&quot;http://twitter.com/download/iphone&quot;&gt;Twitter for iPhone&lt;/a&gt;",
			"text": "Facehuggers are man's best friends."
		},

		initialize: function() {
			var self = this;

			this.on('selected', function() {
				Backbone.trigger('result/selected', self);
			});

			this.on('unselected', function() {
				Backbone.trigger('result/unselected', self);
			});
		}
	});
});