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
		qunit: {
			files: ['test/**/*.html']
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
			files: '<config:lint.files>',
			tasks: 'lint'
		},
		lint: {
			files: ['grunt.js', 'js/src/*.js', 'js/src/!(lib)**/*.js', 'test/*.js', 'test/!(lib)**/*.js']
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
				browser: true
			},
			globals: {
				require: true,
				define: true,
				requirejs: true
			}
		},
		uglify: {}
	});

	// Default task.
	grunt.registerTask('default', 'lint');
};
