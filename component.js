define([
  "troopjs-dom/component",
  "jquery",
  "corejs-typeahead/typeahead.jquery"
], function(Component, $) {
  "use strict";

  var LENGTH = "length";

  // Restore `$.fn.typeahead`
  var Typeahead = $.fn.typeahead.noConflict();

  return Component.extend(
    function($element, name) {
      var me = this;
      var length = arguments[LENGTH];
      var args = new Array(length - 2);

      while (length-- > 2) {
        args[length - 2] = arguments[length];
      }

      me.on("sig/initialize", function() {
        Typeahead.apply($element, args);
      });

      me.on("sig/finalize", function() {
        Typeahead.call($element, "destroy");
      });
    },

    [
      "open",
      "close",
      "val"
    ].reduce(function(spec, method) {
      // Create `"on/typeahead/do/" + method`
      spec["on/typeahead/do/" + method] = function() {
        var length = arguments[LENGTH];
        var args = [method];

        while (length-- > 0) {
          args[length + 1] = arguments[length];
        }

        return Typeahead.apply(this.$element, args);
      };

      // Return spec for next iteration
      return spec;
    }, {}),

    [
      "active",
      "idle",
      "open",
      "close",
      "change",
      "render",
      "select",
      "autocomplete",
      "asyncrequest",
      "asynccancel",
      "asyncreceive"
    ].reduce(function(spec, method) {
      // Create `"dom/typeahead:" + method`
      spec["dom/typeahead:" + method] = function() {
        var me = this;
        var length = arguments[LENGTH];
        var args = ["typeahead/" + method];

        while (length-- > 0) {
          args[length + 1] = arguments[length];
        }

        return me.emit.apply(me, args);
      };

      // Return spec for next iteration
      return spec;
    }, {}));
});
