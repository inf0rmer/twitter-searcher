/*global module:false*/
module.exports = function(grunt) {

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
			files: ['grunt.js', 'js/src/*.js', 'js/src/!(lib)**/*.js', 'test/*.js', 'test/!(lib)**/*.js']
		},
		recess: {
			dev: {
				src: ['css/src/main.less'],
				dest: 'css/src/main.css',
				options: {
					compile: true
				}
			}
		},
		concat: {
			dist: {
				src: ['<banner:meta.banner>', '<file_strip_banner:lib/FILE_NAME.js>'],
				dest: 'dist/FILE_NAME.js'
			}
		},
		min: {
			dist: {
				src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
				dest: 'dist/FILE_NAME.min.js'
			}
		},
		watch: {
			files: ['<config:lint.files>', 'css/src/*.less'],
			tasks: ['lint', 'recess:dev']
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
	// Default task.
	grunt.registerTask('default', 'lint');
};
