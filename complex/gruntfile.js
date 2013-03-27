module.exports = function(grunt) {

	// Load all of our NPM tasks...
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-jshint');


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			name: 'Project Name',
			banner: '/*! <%= meta.name %> - v<%= pkg.version %> - <%= template.today("m/d/yyyy") %> */'
		},

		// Stylus task, compile our stylus to src/temp/compiled-stylus.css
		stylus: {
			compile: {
				src: 'src/stylus/*.styl',
				dest: 'src/temp/compiled.css'
			}
		},


		// Compile all .coffee files in the src/coffee directory and place it into temp folder
		coffee: {
			compile: {
				files: {
					'src/temp/coffee.js' : ['*.coffee']
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
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("mm-dd-yyyy") %> */\n',
				compress: true,
				mangle: true
			},

			dev: {
				files: {
					'src/temp/minified.js': ['src/temp/coffee.js']
				}
			}
		},


		// Minify our CSS so it has the smallest footprint possible. This can make debugging
		// a bit more difficult but again, with Stylus, it doesnt really matter given the
		// differences between source and compiled css.
		cssmin: {
			compress: {
				src: 'src/temp/compiled.css',
				dest: 'src/temp/compiled-min.css'
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
			all: ['gruntfile.js', 'src/temp/*.js']
		},


		// Copy all of our new files out of our src/temp directory to the output css
		// and output js files.
		copy: {
			css: {
				src: 'src/temp/compiled-min.css',
				dest: 'htdocs/assets/css/main.css'
			},
			js: {
				src: 'src/temp/minified.js',
				dest: 'htdocs/assets/js/main.js'
			}
		},


		// Setup watch tasks for any modifßications made to any Coffee or Stylus files
		// and then re-run the needed tasks.
		watch: {
			coffee: {
				files: ['src/coffee/*.coffee'],
				tasks: ['coffee', 'uglify', 'jshint', 'copy:js', 'clean'],
				options: {
					interrupt: false
				}
			},
			stylus: {
				files: ['src/stylus/*.styl'],
				tasks: ['stylus', 'cssmin', 'copy:css', 'clean'],
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


	grunt.registerTask('default', ['stylus', 'coffee', 'uglify', 'cssmin', 'jshint', 'copy', 'clean', 'watch']);
};
