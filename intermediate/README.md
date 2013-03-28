The goal of the 'intermediate' project is to introduce more complex uses of grunt. In addition to the concepts discussed in the 'simple' project, you'll learn:

* File minification
* The Banner
* How to tie tasks together
* JSHint
* Copying Files
* Delete temporary files

## How do I use this?
Great question! Simply point your terminal to the base directory and run `npm install` to install the
dependencies for this project. NPM will install all required dependencies (Grunt and the needed modules).
After completion we are ready to start! Run `grunt` in the terminal and watch the magic.

## Grunt Task Breakdown
The first task of this gruntfile is to concatenate your Javascript. Our two files located within our /js
directory will be concatenated together in the order they are passed in. plugins.js at the top of our newly
concatenated file and main.js below that. Notice our new file (concat.js) is placed in a temp directory.

Our second task is minification of our newly concatenated js file in the temp directory. Here we apply a
banner to the top of the minified file. We also tell Uglify to compress and mangle the Javascript. If you
are unfamilar with the mangle process, it replaces function names and variables with simple letters. So
your function of myFunction = function(args) becomes a = function(args) and so fourth. Once our file is 
minified it placed into our htdocs/js directory as main-min.js.

The third task is JSHint. Everybody loves JSHint as it will expose any glaring issues with your code.

Next step is to minify our CSS to provide the absolute smallest footprint on the browser. css/main.css
is minified down to main-min.css. The next and final step is removing our temp directory we were using
to store the temp files. 

We now have production grade assets ready to go!