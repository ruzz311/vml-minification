module.exports = function(grunt) {

	output_dir = 'htdocs/',
	source_dir = 'src/',
	temp_dir   = source_dir + 'temp';

	// Load all of our NPM tasks...
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Output dirs
	js_dir      = output_dir + 'js',
	css_dir     = output_dir + 'css',

	// Source dirs
	coffee_dir  = source_dir + 'js',
	stylus_dir  = source_dir + 'css';

	// Output files
	output_js   = output_dir + 'js/main.js',
	output_css  = output_dir + 'css/main.css';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			name: 'Project Name',
			banner: '/*! <%= meta.name %> - v<%= pkg.version %> - <%= template.today("m/d/yyyy") %> */'
		},

		// Stylus task, compile our stylus to src/temp/compiled-stylus.css
		stylus: {
			compile: {
				src: stylus_dir + '/main.styl',
				dest: temp_dir + '/compiled-stylus.css'
			}
		},

		// This gets a bit trickey, we have to run two concat tasks, one
		// is before Coffee is compiled, the other is after the compilation.
		// devPre tasks concats all coffee files, devPost then concats Twitter
		// Bootstrap JS with our newly compiled Coffee. It also does the same 
		// with our CSS.
		concat: {
			devPre: {
				src: [coffee_dir + '/main.coffee', coffee_dir + '/nav.coffee', coffee_dir + '/core.coffee'],
				dest: temp_dir + '/concat-coffee.coffee'
			},

			devPost: {
				files: [
					{
						src: [js_dir + '/bootstrap.js', temp_dir + '/compiled-coffee.js'],
						dest: temp_dir + '/all.js'
					},

					{
						src: [css_dir + '/bootstrap.css', temp_dir + '/compiled-stylus.css'],
						dest: temp_dir + '/compiled-css.css'
					}
				]
			},

			// This task is specific to the Watch CSS task, we don't want it messing
			// with our JS since there isn't anything to move out of the temp dir.
			watchCss: {
				src: [css_dir + '/bootstrap.css', temp_dir + '/compiled-stylus.css'],
				dest: temp_dir + '/compiled-css.css'
			}
		},

		// After our devPre task from above is run, it now compiles that single concated
		// Coffee file.
		coffee: {
			compile: {
				files: {
					'src/temp/compiled-coffee.js' : [temp_dir + '/concat-coffee.coffee'],
					'htdocs/js/loader.js': [coffee_dir + '/loader.coffee']
				}
			}
		},

		// Minify and mangle all JS. Uglify seems to have better performance numbers
		// for minifying and compressing JS that is relatively small. For large projects,
		// Google Closure Compiler is probably a better option. There is a Grunt module
		// to use Closure Compiler. We will outline this in tutorial numero 2. This can
		// make debugging more difficult but honestly with CoffeeScript, it doesn't really
		// matter since compiled v source is vastly different.
		uglify: {
			options: {
				// Pritn a banner on our Uglified JS.
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("mm-dd-yyyy") %> */\n',
				compress: true,
				mangle: true
			},

			dev: {
				files: {
					'src/temp/uglified.js': [temp_dir + '/all.js'],
					'htdocs/js/loader.js': 'htdocs/js/loader.js'
				}
			}
		},

		// Everybody loves JSHint. Use it to find any glaring errors with your code. 
		// Remember: chrome the bolts
		jshint: {
			options: {
				curley: true,
				eqeqeq: true,
				browser: true,
				globals: {
					jQuery: true
				}
			},
			dev: {
				beforeconcat: [temp_dir + '/*.js'],
				afterconcat: [js_dir + '/*.js']
			}
		},

		// Minify our CSS so it has the smallest footprint possible. This can make debugging
		// a bit more difficult but again, with Stylus, it doesnt really matter given the
		// differences between source and compiled css.
		cssmin: {
			compress: {
				src: temp_dir + '/compiled-css.css',
				dest: temp_dir + '/cssmin.css'
			}
		},

		// Copy all of our new files out of our src/temp directory to the output css
		// and output js files.
		copy: {
			css: {
				src: temp_dir + '/cssmin.css',
				dest: output_css
			},
			js: {
				src: temp_dir + '/uglified.js',
				dest: output_js
			}
		},

		// Setup watch tasks for any modifßications made to any Coffee or Stylus files
		// and then re-run the needed tasks.
		watch: {
			coffee: {
				files: [coffee_dir + '/*.coffee'],
				tasks: ['concat:devPre', 'coffee', 'concat:devPost', 'uglify:dev', 'copy:js', 'jshint', 'clean'],
				options: {
					interrupt: false
				}
			},
			stylus: {
				files: [stylus_dir + '/*.styl'],
				tasks: ['stylus', 'concat:watchCss', 'cssmin', 'copy:css', 'clean'],
				options: {
					interrupt: false
				}
			}
		},

		// Empty out our src/temp directory to be prepared for the next time.
		clean: {
			kill: ['src/temp']
		}
	});

	grunt.registerTask('default', function() {
		grunt.log.writeln('I told you not to use the default task.');
	});

	// You must run this in your termial as:  grunt dev
	// I just don't like the default task...
	grunt.registerTask('dev', ['stylus', 'concat:devPre', 'coffee', 'concat:devPost', 'uglify:dev', 'cssmin', 'copy:js', 'copy:css', 'jshint', 'clean', 'watch']);
};
