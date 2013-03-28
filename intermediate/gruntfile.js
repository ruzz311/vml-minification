module.exports = function(grunt) {

    // Load all of our NPM tasks...
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            name: 'Project Name',
            banner: '/*! <%= meta.name %> - v<%= pkg.version %> - <%= template.today("m/d/yyyy") %> */'
        },


        // Concat our two files from HTML5BP - plugins.js and main.js into temporary directory
        concat: {
            app:{
                src:['htdocs/js/plugins.js', 'htdocs/js/main.js'],
                dest: 'temp/concat.js'
            }
        },


        // Minify our newly comcatenated JS out of the temp directory and back into our htdocs/js as
        // main-min.js
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("mm-dd-yyyy") %> */\n',
                compress: true,
                mangle: true
            },
            
            app: {
                files: {
                    'htdocs/js/main-min.js': ['temp/concat.js']
                }
            }
        },


        // Jshint to help you correct glaring issues with your code
        jshint: {
            options: {
                curley: true,
                eqeqeq: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            files: ["js/main.js", "js/plugins.js"]
        },


        // Lets move on to minifying your CSS, main.css gets minified and outputted to main-min.css
        cssmin: {
            compress: {
                src:  'htdocs/css/main.css',
                dest: 'htdocs/css/main-min.css'
            }
        },


        // Empty out our temp directory since there is no need to keep it around
        clean: {
            kill: ['temp']
        }

    });

    // You must run this in your termial as:  grunt
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'clean:kill']);
};
