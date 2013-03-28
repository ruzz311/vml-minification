Starter document. Shows you how to

* Use grunt for the first tiem
* Concatenate files
* Introduction to the watch task

## How do I use this?
Great question! Simply point your terminal to the base directory and run `npm install` to install the
dependencies for this project. NPM will install all required dependencies (Grunt and the needed modules).
After completion we are ready to start! Run `grunt` in the terminal and watch the magic.

## Grunt Task Breakdown
The first task of this gruntfile is to simply concatenate our CSS and Javascript. On closer inspection of
the gruntfile, you may notice the src attribute is set to *.css and *.js. This tells Grunt to look for ANY
file with that file extension and include that in the concatenation.

The next task which has not been added to the default task is watch. If you would like to see how watch works,
simply add it to our default task:

grunt.registerTask('default', ['concat', 'watch']);

Upon running our default task, after the concatenation is complete, Grunt will now listen to any changes to
any file in the project directory then automatically re-run all tasks, in this case re-concatenate all files.