(function() {
  
  // configuration for underscores template syntax
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };
  
  // app namespace setup
  APP = {
      Views: {},
      Models: {},
      Collections: {}
  };

  // a simple slide model
  APP.Models.Slide = Backbone.Model.extend({
      defaults: {
          id: 1,
          headline: 'Welcome to APP',
          caption: 'This is an awesome slide',
          layout: 'right'
      },

      show: function() {
          this.getEl().show();
      },

      getEl: function() {
          return $('#slide-' + this.id);
      },

      getControl: function() {
          return $('.jump-to').eq(this.id - 1);
      }
  });

  // and a simple collection that holds slides
  APP.Collections.Slides = Backbone.Collection.extend({
      model: APP.Models.Slide
  });
  
  
})();