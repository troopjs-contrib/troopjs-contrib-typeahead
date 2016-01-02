define([
  "troopjs-core/emitter/composition",
  "troopjs-compose/decorator/from",
  "corejs-typeahead/bloodhound",
], function(Composition, from, Bloodhound) {
  "use strict";

  // Restore glogal `Bloodhound`
  Bloodhound.noConflict();

  // Extend and copy intance properies from `Bloodhound.prototype`
  var Engine = Composition.extend(Bloodhound, {
    "displayName": "troopjs-contrib-typeahead/engine"
  }, [
    "__ttAdapter,",
    "_loadPrefetch",
    "_initialize",
    "initialize",
    "add",
    "get",
    "search",
    "all",
    "clear",
    "clearPrefetchCache",
    "clearRemoteCache"
  ].reduce(function(spec, method) {
    // Create `spec[method]`
    spec[method] = from(Bloodhound)

    // Return spec for next iteration
    return spec;
  }, {}));

  // Copy static properties from `Bloodhound`
  Engine.tokenizers = Bloodhound.tokenizers;

  // Return `DatEngineaset`
  return Engine;
});
