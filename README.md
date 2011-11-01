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
* Slide background images and text can be aligned "left" or "right"

## Usage

* include lib/css/slideshow.css into your page.
* mixin the contents of lib/js/app.js into your apps .Models, .Views and .Collections namespaces.
* include lib/js/slideshow.js into your page.
* include the 2 client-side templates (slideshow.html > #slide-template, #controls-template) into your page or however you add templates to your app/page.
* include the boilerplate markup (slideshow.html > #slideshow) into your page.
* configure the path to your images (slideshow.html > #slide-template) and name them numerically 1.jpg, 2.jpg .... n.jpg etc...

## Declaration
    <script>
      var slides = new APP.Collections.Slides([
        {
          id: 1,
          headline: 'Heffalumps',
          caption: 'and woozles',
          layout: 'left' // options: 'left', 'right' -> controls layout of text and images in slides
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
* Configurable Image paths via js (they're hardcoded in the client-side templates right now)
* CoffeeScript version
* Package this thing up for standalone use (it was extracted from an existing app and could use some "standalone" love) :)

## Acknowledgments

* [@jashkenas](http://twitter.com/#!/jashkenas) for the creation of underscore and backbone, amazing libraries!
* [@searls](http://twitter.com/#!/searls) for [jasmine-fixture](https://github.com/searls/jasmine-fixture) and other awesome jasmine bdd utilites!