/*global module:false*/
module.exports = function(grunt) {
	grunt.initConfig({
		meta: {
			version: '0.1.0',
			banner: '/*! Popularity Contest - v<%= meta.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'* http://local.popularity-contest/\n' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
				'Bruno Abrantes; Licensed MIT */'
		},
		less: {
			dev: {
				files: {
					'css/src/main.css': ['css/src/main.less']
				},
				options: {
					dumpLineNumbers: 'comments',
					paths: ['css/src']
				}
			},
			dist: {
				files: {
					'css/dist/app.min.css': ['css/src/bootstrap.css', 'css/src/main.less']
				},
				options: {
					paths: ['css/src'],
					yuicompress: true
				}
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
					baseUrl: 'js/src',
					out: 'js/dist/app.min.js',
					preserveLicenseComments: false,
					almond: true,
					wrap: true,
					replaceRequireScript: [{
						files: ['index.html'],
						modulePath: '/' + 'js/dist/app.min'
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
					'js/src/views/templates/templates.js': ['js/src/views/templates/*.template']
				}
			}
		},
		watch: {
			dev: {
				files: ['<%= jshint.files %>', 'css/src/*.less', 'js/src/views/templates/*.template'],
				tasks: ['jshint', 'less:dev', 'jst:compile']
			}
		},
		jshint: {
			files: ['grunt.js', 'js/src/*.js', 'js/src/!(lib)**/*.js', 'test/*.js', 'test/!(lib)**/*.js'],
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
				jquery: true,
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
			}
		},
		uglify: {}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jst');
	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Tasks
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('stage', ['less:dev', 'jst:compile', 'copy', 'replace:stage']);
	grunt.registerTask('build', ['less:dist', 'jst:compile', 'copy', 'replace:dist', 'requirejs']);
};
