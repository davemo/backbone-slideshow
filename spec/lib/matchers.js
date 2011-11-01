beforeEach(function() {
  this.addMatchers({
    toHaveBeenInvokedOnSelector: function(expected) {
      var actual = this.actual.mostRecentCall.object.selector;
      this.message = function() {
        return "Expected invocation on selector " + expected + " but was invoked on " + actual;
      };
      return this.actual.mostRecentCall.object.selector === expected;
    }
  });
});