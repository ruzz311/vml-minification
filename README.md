Using a build process to minify, compress and optimize client side assets can take a variety of forms. The following document and attached examples provide the recommended method per the Client Side CoE.



## Why should I use the recommended method?
At VML, developers are free to chose how they approach their everyday jobs. Our company methodology allows innovative individuals to solve problem in unique ways. This same philosophy also leads to a very diverse range of technologies across teams and projects.

This point of view is one in many future documents from the Client Side CoE that will recommend a set of technologies to solve a common development problem. By using the suggested methods, you'll be able to take advantage of the following:

* Grow your knowledge of a framework through discussion with other developers at VML
* Receive help from other developers who are familiar with the given technology
* Work across teams more easily
* Reduce ramp up time when moving developers between projects


## How To Use a Build Process
**In short - [grunt](http://gruntjs.com/) with a series of [grunt-contrib](https://github.com/gruntjs/grunt-contrib) modules is the preferred method of minifying client side assets at VML.**

Instead of explaining each module in detail, we believe the best method of learning is through example. Two sample projects have been created to act as a set of tutorials for developers unfamiliar with grunt. Within each project you'll find a README with an explanation of purpose and install / compile instructions.

Please see @rmadsen's Github Project - <https://github.com/ruzz311/vml-minification>.

### Getting SetUp
To run the example code, you'll first need to install both Node and Grunt.
* Node can be installed from [nodejs.org](http://nodejs.org/).
* After node is installed, you'll be able to get started with grunt at [gruntjs.org](http://gruntjs.com/getting-started). If you've worked with grunt in the past, take special note of the required uninstall.

#### Command Line Utilities
Teaching command line utilities is beyond the scope of this article. If you're unfamiliar or uncomfortable with CLI's, please reach out to a lead developer on your team or any of the following : @rmadsen, @bkrejci, @mcarter, @cbarendsen, @jlongstreet

#### Using Node for the first time
A thorough explanation of Node is also beyond the scope of this article. If this is your first time using the framework, please review a very brief yet thorough explanation on package management within Node at <http://en.wikipedia.org/wiki/Npm_(software)> - it's at least thorough enough for the tasks covered in this article.

## Use Cases
There are times when we are handing code over to a client for them to maintain moving foward. We all know maintaining a minified code base can be a challenge. If a client wants to maintain the code, we should hand off minified along with non-minified code and explain the benefits of minification to the client. This is us doing our due diligence. The choice should be left up to the client moving foward.

## Take Care Of Your Code
Take care of your code because there is a chance that no one else will. Do not rely on a server or application developer to supply code that will minify your code for you.


## Why did we choose Node and Grunt?
Node is a very versatile framework and will play a role in the future at VML. Both Node and Grunt are:

* Free to use
* Easy to install
* Well documented
* Open source
* Easy to contribute to
* Flexible and extendible
* Popular and interesting



## Who uses Grunt?
Adobe, Pinterest, Backbone Boilerplate, Walmart Labs, Opera Software, jQuery, jQuery Mobile, jQuery UI, Twitter / TweetDeck and Modernizr just to name a few.

## Notes
* It's worth noting that references to files in the HTML documents are compiled asses. For example, in the simple project, the script asset should point to `assets/js/app.js`, NOT `assets/js/yourcode.js`