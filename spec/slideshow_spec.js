describe('Slideshow View', function() {
  
  var view, slideOne, slideTwo, slideThree, slideshow, slides, controls, events;

  beforeEach(function() {
    spyOn(window, 'setInterval');
    spyOn(window, 'clearInterval');
    
    slideshow = inject('<div id="slideshow"><ul class="slides"></ul><ul class="controls"><li class="slide-control toggle-play-pause"></li></ul></div>');
    slides = slideshow.find('.slides');
    controls = slideshow.find('.controls');
    slideOne = new APP.Models.Slide({id:1});
    slideTwo = new APP.Models.Slide({id:2});    
    slideThree = new APP.Models.Slide({id:3});    
    view = new APP.Views.Slideshow({collection: new APP.Collections.Slides([slideOne, slideTwo, slideThree])});
  });
  
  describe('DOM node references', function() {
    describe('el', function() {
      it('binds to #slideshow', function() {
        expect($(view.el)).toHaveId('slideshow');
      });
    });

    describe('slides', function() {
      it('lives in #slideshow', function() {
        expect(view.slides).toBe('#slideshow .slides');
      });
    });

    describe('controls', function() {
      it('lives in #slideshow .controls', function() {
        expect(view.controls).toBe('#slideshow .controls');
      });
    });
    
    describe('playPauseControl', function() {
      it('lives in #slideshow .controls .toggle-play-pause', function() {
        expect(view.playPauseControl).toBe('#slideshow .controls .toggle-play-pause');
      });
    });
  });

  describe('the default slide transition time period', function() {
    it('is set to 10 seconds', function() {
      expect(view.delay).toBe(10000);
    });
  });

  describe('the default starting slide index', function() {
    it('starts at the first slide', function() {
      expect(view.currentIndex).toBe(0);
    });
  });

  describe('events', function() {
    it('defines these default events', function() {
      events = {
        'click .toggler' : 'toggleVisibility',
        'click .toggle-play-pause' : 'togglePlayPause',
        'click .jump-to' : 'jumpTo'
      };
      expect(view.events).toEqual(events);
    });
  });

  describe('#render', function() {

    beforeEach(function() {
      spyOn(view, 'start');
      view.render();
    });

    it('renders 3 slides out to the .slides element', function() {
      expect(slides).toContain('li.slide');
      expect(slides.find('.slide').length).toBe(3);
    });

    it('renders .jump-to controls for the slides to the .controls element', function() {
      expect(controls).toContain('li.jump-to');
      expect(controls.find('.jump-to').length).toBe(3);
    });

    it('shows the first slide', function() {
      expect($('.slide:first')).toBeVisible();
    });

    it('starts play', function() {
      expect(view.start).toHaveBeenCalled();
    });
  });

  describe('#rotateSlides', function() {

    beforeEach(function() {
      spyOn(view, 'transition');
    });

    context('current slide is not at the end', function() {
      it('should transition from the current slide to the next slide', function() {
        view.rotateSlides();
        expect(view.transition).toHaveBeenCalledWith(0, 1);
      });
    });

    context('current slide is at the end', function() {
      it('should show the first slide and hide the last slide', function() {
        view.currentIndex = 2;
        view.rotateSlides();
        expect(view.transition).toHaveBeenCalledWith(2, 0);
      });
    });
  });

  describe('#transition', function() {

    beforeEach(function() {
      spyOn($.fn, 'fadeOut');
      inject(
        '<li class="slide-control jump-to current" data-index="0">1</li>' +
        '<li class="slide-control jump-to" data-index="1">2</li>' +
        '<li class="slide-control jump-to" data-index="2">3</li>'
      );
      inject(
        '<li id="slide-1">1</li>' +
        '<li id="slide-2">2</li>' +
        '<li id="slide-3">3</li>'
      );
    });

    it('fades out the current slide', function() {
      view.transition(0, 1);
      expect($.fn.fadeOut).toHaveBeenInvokedOnSelector('#slide-1');
    });

    it('toggles the "current" class on the controls representing the current and next slides', function() {
      view.transition(0, 1);
      expect(view.collection.at(0).getControl()).not.toHaveClass('current');
      expect(view.collection.at(1).getControl()).toHaveClass('current');
    });

    it('sets the currentIndex to the value of "to"', function() {
      view.transition(0, 1);
      expect(view.currentIndex).toBe(1);
    });

  });

  describe('#toggleVisibility', function() {
    context('visible slideshow', function() {
      it('should hide .slides and set the class collapsed on #slideshow', function() {
        view.toggleVisibility();
        expect(slides).toBeHidden();
        expect(slideshow).toHaveClass('collapsed');
      });

    });
    context('hidden slideshow', function() {
      it('should show .slides and remove the class collapsed from #slideshow', function() {
        view.toggleVisibility();
        view.toggleVisibility();
        expect(slides).toBeVisible();
        expect(slideshow).not.toHaveClass('collapsed');
      });
    });
  });
  
  describe('#start', function() {
    beforeEach(function() {
      spyOn(slideOne, 'show');
      spyOn($.fn, 'toggleClass');
      view.start();
    });
    
    it('shows the dom element that corresponds to the first element in the slides collection', function() {
      expect(slideOne.show).toHaveBeenCalled();
    });
    
    it('toggles the class "current" on the control that represents the first element in the slides collection', function() {
      expect($.fn.toggleClass).toHaveBeenCalledWith('current');
    });
  });

  describe('#play', function() {
    beforeEach(function() {
      view.play();
    });

    it('sets the state of the view to "playing"', function() {
      expect(view.state).toBe('playing');
    });

    it('sets the views intervalID via setInterval', function() {
      expect(view.intervalID).not.toBeNull();
      expect(window.setInterval).toHaveBeenCalledWith(view.rotateSlides, view.delay);
    });
  });

  describe('#pause', function() {
    beforeEach(function() {
      view.state = 'playing';
      view.pause();
    });

    it('sets the state of the view to "paused"', function() {
      expect(view.state).toBe('paused');
    });

    it('clears the interval to stop rotating', function() {
      expect(window.clearInterval).toHaveBeenCalledWith(view.intervalID);
    });
  });

  describe('#jumpTo', function() {
    var eventMock, control;

    beforeEach(function() {
      spyOn(view, 'pause');
      spyOn(view, 'transition');
      eventMock = {
        currentTarget: $('<li class="slide-control jump-to current" data-index="3">4</li>')
      };
      view.jumpTo(eventMock);
    });

    it('pauses play of the slideshow', function() {
      expect(view.pause).toHaveBeenCalled();
    });

    it('initiates a transition between the current slide and the one passed in via event', function() {
      expect(view.transition).toHaveBeenCalledWith(view.currentIndex, 3);
    });
  });
});