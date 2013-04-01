The goal of the 'complex' project is to introduce further uses of grunt. In addition to the concepts discussed in the 'simple' and 'intermediate' projects, you'll learn:

* How to compile a preprocessed css language - Stylus
* How to compile a preprocessed js language - CoffeeScript

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

The fifth task is to copy our newly compiled and minifed assets out of our temp directory to our /htdocs
directory. After this task is completed, we run the clean/kill task which removes our temp directory so
it will be clean for our next build.

After that is completed we now setup our watch tasks. This is what makes developing with Stylus and 
Coffeescript really great. Any changes made to the files will result in an automatic compile and with a quick 
browser refresh, you can see your brand new code in action.

## What is CoffeeScript?
CoffeeScript is a little language that compiles into JavaScript. Underneath that awkward Java-esque patina, JavaScript has always had a gorgeous heart. CoffeeScript is an attempt to expose the good parts of JavaScript in a simple way.

The golden rule of CoffeeScript is: "It's just JavaScript". The code compiles one-to-one into the equivalent JS, and there is no interpretation at runtime. You can use any existing JavaScript library seamlessly from CoffeeScript (and vice-versa). The compiled output is readable and pretty-printed, passes through JavaScript Lint without warnings, will work in every JavaScript runtime, and tends to run as fast or faster than the equivalent handwritten JavaScript.

[http://www.coffeescript.org](http://www.coffeescript.org/)

## What is Stylus?
Stylus is an expressive, dynamic, robust CSS language for nodejs with a plethora of features.

[http://learnboost.github.com/stylus/](http://learnboost.github.com/stylus/)