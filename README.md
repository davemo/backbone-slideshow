backbone-slideshow
====================

A simple backbone.js powered slideshow. Great for satisfying those markety-types, who want a "rotating slide thingy", without having to use a jQuery plugin.

## Demo

A basic working demo is up on [jsfiddle](http://jsfiddle.net/dmosher/wNATp/)

## Features

![backbone-slideshow preview](https://github.com/davemo/backbone-slideshow/raw/master/lib/img/preview.png)

* Rotates between any number of slides
* Generates controls for each slide
* Play/Pause toggle button 
* Collapsible (pauses when hidden, plays when shown)
* Jump to any given slide by clicking on the corresponding control (triggers pause)

## Usage

* include lib/css/slideshow.css into your page.
* mixin the contents of lib/js/app.js into your apps .Models, .Views and .Collections namespaces.
* include lib/js/slideshow.js into your page.
* include the 2 client-side templates (#slide-template and #controls-template) from slideshow.html into your page or however you add templates to your app/page.
* include the boilerplate markup (#slideshow) from slideshow.html into your page.

## Declaration
    <script>
      var slides = new APP.Collections.Slides([
        {
          id: 1,
          headline: 'Heffalumps',
          caption: 'and woozles',
          layout: 'left' // optional
        } //... etc
      ]);
      var slideshow = new APP.Views.Slideshow().render();
    </script>

## 3rd Party Dependencies

* [underscore.js](http://documentcloud.github.com/underscore/)
* [backbone.js](http://documentcloud.github.com/backbone/)
* [jquery.js](http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js)

## Author

* [David Mosher](http://zerply.com/dmosher)

## Contributions

Pull requests with passing specs will be gladly accepted :)

## Todos

These things are a list of 'nice-to-haves' that I'll probably get around to

* Upload a demo page w/ GH pages.
* Style the demo page using Twitter Bootstrap
* API for creating a slideshow completely via js (ie: no html template deps) -> new APP.Views.Slideshow({ container: "#myContainer", slides: myCollection }).render();
* CoffeeScript version

## Acknowledgments

* [@jashkenas](http://twitter.com/#!/jashkenas) for the creation of underscore and backbone, amazing libraries!
* [@searls](http://twitter.com/#!/searls) for [jasmine-fixture](https://github.com/searls/jasmine-fixture) and other awesome jasmine bdd utilites!