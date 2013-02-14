/*global module:false*/
module.exports = function(grunt) {

	var CSS_SRC_DIR   = 'css/src/',
		CSS_BUILD_DIR = 'css/dist/',
		JS_SRC_DIR    = 'js/src/',
		JS_BUILD_DIR  = 'js/dist/';

	// Project configuration.
	grunt.initConfig({
		meta: {
			version: '0.1.0',
			banner: '/*! Popularity Contest - v<%= meta.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'* http://local.popularity-contest/\n' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
				'Bruno Abrantes; Licensed MIT */'
		},
		lint: {
			files: ['grunt.js', JS_SRC_DIR + '*.js', JS_SRC_DIR + '!(lib)**/*.js', 'test/*.js', 'test/!(lib)**/*.js']
		},
		recess: {
			dev: {
				src: [CSS_SRC_DIR +  'main.less'],
				dest: CSS_SRC_DIR +  'main.css',
				options: {
					compile: true,
					prefixWhitespace: true
				}
			},
			dist: {
				options: {
					compile: true,
					compress: true
				},
				src: [CSS_SRC_DIR +  'bootstrap.css', CSS_SRC_DIR +  'main.less'],
				dest: CSS_BUILD_DIR + 'app.min.css'
			}
		},
		replace: {
			stage: {
				options: {
					variables: {
						'cssFiles': '<link rel="stylesheet" href="/css/src/bootstrap.css">\n<link rel="stylesheet" href="/css/src/main.css">'
					},
					prefix: '@@'
				},
				files: {
					'index.html': ['index.html']
				}
			},
			dist: {
				options: {
					variables: {
						'cssFiles': '<link rel="stylesheet" href="/css/dist/app.min.css">'
					},
					prefix: '@@'
				},
				files: {
					'index.html': ['index.html']
				}
			}
		},
		copy: {
			target: {
				files: {
					'index.html': 'src/index.html'
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					name: 'main',
					baseUrl: JS_SRC_DIR,
					out: JS_BUILD_DIR + 'app.min.js',
					preserveLicenseComments: false,
					almond: true,
					wrap: true,
					replaceRequireScript: [{
						files: ['index.html'],
						modulePath: '/' + JS_BUILD_DIR + 'app.min'
					}],
					deps : ['main'],
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
				}
			}
		},
		jst: {
			compile: {
				files: {
					'js/src/views/templates/templates.js': [JS_SRC_DIR + '/views/templates/*.template']
				}
			}
		},
		watch: {
			files: ['<config:lint.files>', 'css/src/*.less', JS_SRC_DIR + '/views/templates/*.template'],
			tasks: ['lint', 'recess:dev', 'jst:compile']
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true,
				jquery: true
			},
			globals: {
				Backbone: false,
				require: false,
				define: false,
				requirejs: false,
				_: false,
				console: false,
				expect: false,
				describe: false,
				before: false,
				beforeEach: false,
				afterEach: false,
				it: false,
				setup: false,
				suite: false,
				teardown: false,
				test: false,
				mocha: false,
				humanized_time_span: false
			}
		},
		uglify: {}
	});

	grunt.loadNpmTasks('grunt-recess');
	grunt.loadNpmTasks('grunt-contrib-jst');
	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-replace');

	// Tasks
	grunt.registerTask('stage', 'recess:dev jst:compile copy replace:stage');
	grunt.registerTask('build', 'recess:dist jst:compile copy replace:dist requirejs');
};
