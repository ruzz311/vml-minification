module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        concat: {
            css: {
                src: 'htdocs/assets/css/*.css',
                dest: 'htdocs/assets/app.css'
            },
            js : {
                src: 'htdocs/assets/js/*.js',
                dest: 'htdocs/assets/app.js'
            }
        },
        watch: {
            files: '**/*',
            tasks: ['concat']
        }
    });

    grunt.registerTask('default', ['concat']);
};