define([
  "troopjs-core/emitter/composition",
  "troopjs-compose/decorator/from",
  "corejs-typeahead/bloodhound",
], function(Composition, from, Bloodhound) {
  "use strict";

  // Restore glogal `Bloodhound`
  Bloodhound.noConflict();

  // Extend and copy intance properies from `Bloodhound.prototype`
  var Dataset = Composition.extend(Bloodhound, {
    "displayName": "troopjs-contrib-typeahead/dataset"
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
  Dataset.tokenizers = Bloodhound.tokenizers;

  // Return `Dataset`
  return Dataset;
});
