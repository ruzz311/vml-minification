Complex Shows you how to

* Compile Stylus
* Compile Coffeescript
* Minify
* Use multiple tasks
* Use jshint
* Copy files
* Delete temporary files
* Watch for file changes

## How do I use this?
Great question! Simply point your terminal to the base directory and run `npm install` to install the
dependencies for this project. NPM will install all required dependencies (Grunt and the needed modules).
After completion we are ready to start! Run `grunt` in the terminal and watch the magic.

## Grunt Task Breakdown
The complex project is setup slightly different than the simple or intermediate gruntfiles. For this, we
are using Coffeescript and Stylus which live in our /src directory, outside of /htdocs to help keep our
source files seperate from their compiled counterparts.

Our first task in this gruntfile is compile all Stylus in our /src/stylus directory. These are compiled down
to one file in the temp directory, compiled.css.

The second task is compiling the Coffeescript. This does the same thing as the Stylus task, compile all files
in the Coffee directory down to one file in our temp directory, coffee.js.

Now that we have our source files compiled, we need to minify them. The third task is minify our Javascript.
This task takes our newly compiled Coffeescript (temp/coffee.js) and compresses it down to temp/minified.js.

The next step in the minification process is do the same with our CSS. Our newly compiled Stylus is compressed
down to temp/compiled-min.css.

The fifth task is running JSHint over our compiled Javascript just to help make sure there are no major issues
with it before we move on.

The sixth task is to copy our newly compiled and minifed assets out of our temp directory to our /htdocs
directory. After this task is completed, we run the clean/kill task which removes our temp directory so
it will be clean for our next build.

After that is completed we now setup our watch tasks. This is what makes developing with Stylus and 
Coffeescript really great. Any changes made to the files will result in an automatic compile and with a quick 
browser refresh, you can see your brand new code in action.