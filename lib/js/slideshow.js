(function(_, Backbone) {

  // the meat of the logic, defines the slideshow, hooks into existing dom elements representing slides and controls
  // handles events and timing, play, pause, jumpto
  APP.Views.Slideshow = Backbone.View.extend({

      el: '#slideshow',
      slides: '#slideshow .slides',
      controls: '#slideshow .controls',
      playPauseControl: '#slideshow .controls .toggle-play-pause',

      delay: 10000,
      currentIndex: 0,

      events: {
          'click .toggler': 'toggleVisibility',
          'click .toggle-play-pause': 'togglePlayPause',
          'click .jump-to': 'jumpTo'
      },

      slideTemplate: _.template($("#slide-template").html()),

      controlTemplate: _.template($("#controls-template").html()),        

      initialize: function() {
          _.bindAll(this);
      },

      render: function() {
          var self = this;
          this.collection.each(function(slide, i) {
              $(self.slides).append(self.slideTemplate(slide.toJSON()));
              $(self.controls).append(self.controlTemplate({
                  index: i,
                  human_readable_index: ++i
              }));
          });
          this.initialPlay();
          return this;
      },

      rotateSlides: function() {
          var current = this.currentIndex;
          var next = this.currentIndex === (this.collection.length - 1) ? 0 : this.currentIndex + 1;
          this.transition(current, next);
      },

      transition: function(from, to) {
          var current = this.collection.at(from);
          var next = this.collection.at(to);
          current.getEl().fadeOut('slow', function() {
              next.getEl().fadeIn('slow');
          });
          current.getControl().toggleClass('current');
          next.getControl().toggleClass('current');
          this.currentIndex = to;
      },

      toggleVisibility: function() {
          var slides = $(this.slides);
          slides.toggle();
          $(this.el).toggleClass('collapsed');
          if (slides.is(":visible")) {
              this.play();
          } else {
              this.pause();
          }
      },

      togglePlayPause: function() {
          if (this.isPlaying()) {
              this.pause();
          } else {
              this.play();
          }
      },

      initialPlay: function() {
          this.collection.at(0).show();
          this.collection.at(0).getControl().toggleClass('current');
          this.play();
      },

      pause: function() {
          if (this.isPaused()) {
              return;
          }
          this.state = 'paused';
          clearInterval(this.intervalID);
          $(this.playPauseControl).toggleClass('playing', false);
      },

      play: function() {
          if (this.isPlaying()) {
              return;
          }
          this.state = 'playing';
          this.intervalID = setInterval(this.rotateSlides, this.delay);
          $(this.playPauseControl).toggleClass('playing', true);
      },

      jumpTo: function(e) {
          var next = $(e.currentTarget).data('index');
          this.pause();
          this.transition(this.currentIndex, next);
      },

      isPlaying: function() {
          return this.state === 'playing';
      },

      isPaused: function() {
          return !this.isPlaying();
      }

  });
  
})(this._, this.Backbone);