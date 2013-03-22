module.exports = function(grunt) {

	output_dir = 'htdocs/',
	source_dir = 'src/',
	temp_dir   = source_dir + 'temp/';

	//grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-image-embed');
	grunt.loadNpmTasks('grunt-contrib-mincss');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Output dirs
	js_dir      = output_dir + 'js',
	css_dir     = output_dir + 'css',

	// Source
	coffee_dir  = source_dir + 'js',
	stylus_dir  = source_dir + 'css';

	// Output files
	output_js   = output_dir + 'js/main.js',
	output_css  = output_dir + 'css/main.css';

	grunt.initConfig({
		// Setup our package
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			name: '[your_project_name]',
			banner: '/*! <%= meta.name %> - v<%= pkg.version %> - <%= template.today("m/d/yyyy") %> */'
		},

		// Compile Stylus to temp/main.css
		stylus: {
			compile: {
				files: {
					'temp/main.css' : stylus_dir + '/main.styl'
				}
			}
		},

		// Compile our CoffeeScript, we async load scripts from loader so we are compiling all
		// Coffee into one file, main.js. Then compile loader.coffee
		coffee: {
			compile: {
				files: {
					'htdocs/js/main.js' : [coffee_dir + '/main.coffee', coffee_dir + '/nav.coffee', coffee_dir + '/helpers.coffee', coffee_dir + '/core.coffee'],
					'htdocs/js/loader.js' : [coffee_dir + '/loader.coffee']
				}
			}
		},

		// Concat Files, take all js and concat them into one new file, temp/compiled.js.
		// Then same with our CSS
		concat: {
			js: {
				src: [js_dir + '/bootstrap.js', js_dir + '/plugins.js', js_dir + '/main.js'],
				dest: 'temp/compiled.js'
			},

			css: {
				src: ['htdocs/css/bootstrap.css', temp_dir + '/main.css'],
				dest: 'temp/compiled.css'
			}
		},

		// Uglify Files, Uglify works pretty well, my next example will use Google Closure Compiler
		// for this. Anyway dev is simple, taking our "compiled" files from above and now minifying 
		// and mangling them (obfucating variable names to a, b, c, d... ). Dev task we only do our
		// single file, our prod process is a bit more intensive.
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
				compress: true,
				mangle: true
			},
			dev: {
				files: {
					'temp/compiled-min.js': [temp_dir + '/compiled.js']
				}
			},
			prod: {
				files: {
					'htdocs/js/loader.js': [js_dir + '/js/loader.js'],
					'htdocs/js/main.js': [js_dir + '/js/main.js'],
					'temp/compiled-min.js': [temp_dir + '/compiled.js']
				}
			}
		},

		// Base64 Embed Background Images for optimization, yea its a big deal...
		imageEmbed: {
			dist: {
				src: 'temp/compiled.css',
				dest: 'temp/imageembed.css'
			}
		},

		// Minify CSS, this will help reduce filesize. Its harder to troubleshoot or
		// develop in browser so some don't like doing this until you are pushing 
		// prod builds out. 
		cssmin: {
			compress: {
				src: 'temp/imageembed.css',
				dest: 'temp/build.css'
			}
		},

		// Copy JS/CSS from temp dir out to /htdocs
		copy: {
			dev: {
				files: [
					{
						src: 'temp/compiled.css',
						dest: output_css
					},
					{
						src: 'temp/compiled.js',
						dest: output_js
					}
				]
			},

			prod: {
				files: [
					{
						src: 'temp/build.css',
						dest: output_css
					},
					{
						src: 'temp/compiled-min.js',
						dest: output_js
					}
				]
			}
		},

		// Setup our watch tasks - these are great, think CodeKit but better.. Grunt Watch.
		// These watch the Coffee and Stylus dirs for any changes, if it detects any changes
		// it will automatically re-run a handful of tasks to produce a build of that file.
		// Its a beautiful thing. Coffee gets compiled > concat:js/css task > copy:dev task > clean
		watch: {
			coffee: {
				files: [coffee_dir + '/*.coffee'],
				tasks: ['coffee', 'concat:js', 'copy:dev', 'clean'],
				options: {
					interrupt: false
				}
			},
			stylus: {
				files: [stylus_dir + '/*.styl'],
				tasks: ['stylus', 'concat:css', 'copy:dev', 'clean'],
				options: {
					interrupt: false
				}
			}
		},

		// Clean our temp directory
		clean: {
			kill: ['temp']
		}
	});

	grunt.registerTask('default', function() {
		grunt.log.writeln('I told you not to use the default task.');
	});
	// Run in terminal: grunt dev    or    grunt prod
	grunt.registerTask('dev', ['stylus', 'coffee', 'concat', 'uglify:dev', 'copy:dev', 'clean', 'watch']);
	grunt.registerTask('prod', ['coffee', 'concat', 'uglify:prod', 'imageEmbed', 'cssmin', 'copy:prod', 'clean']);
};
