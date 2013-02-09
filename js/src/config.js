require.config({
  // Initialize the application with the main application file
  deps : [ 'main' ],

  paths : {
	// JavaScript folders
	lib : './lib',
	app : '.',

	// Libraries
	jquery : './lib/jquery-1.9.1',
	underscore : './lib/underscore',
	backbone : './lib/backbone',
	bootstrap: './lib/bootstrap',

	// Shim Plugin
	use : './lib/plugins/use',
	text : './lib/plugins/text'
  },

  use : {
	underscore : {
		attach : '_'
	},
	backbone : {
		deps : [ 'use!underscore', 'jquery' ],
		attach  : 'Backbone'
	},
	bootstrap: {
		deps: ['jquery']
	}
  }
});