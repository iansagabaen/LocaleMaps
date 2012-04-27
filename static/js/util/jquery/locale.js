/**
 * @fileoverview Defines Backbone model and collection for locales used in
 *   localemaps.com.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.www');

/**
 * Constructs a Locale model
 * @constructor
 * @extends {Backbone.Model}
 */
localemaps.www.Locale = Backbone.Model.extend({
  /**
   * Initializes the locale instance with specified data.
   * @param {Object} attributes Map of attributes to set on a given locale.
   * @override
   */
  initialize: function(attributes) {
    if (attributes.gla && attributes.gln) {
      this.set({
        latitude: attributes.gla,
        longitude: attributes.gln
      });
    }
  }
});

/**
 * Constructs a collection of @see {localemaps.www.Locale} instances.
 * @constructor
 * @extends {Backbone.Collection}
 */
localemaps.www.Locales = Backbone.Collection.extend({
  model: localemaps.www.Locale,
  url: '/locales'
});