/**
 * @fileoverview Defines a SearchForm Backbone view that wraps around the
 *   Search form module used on the localemaps.com home page.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.www');

/** @define {string} */
var SEARCH_SUCCESS = 'search-success';

/**
 * Wrapper around the #search-form element, which handles display of the
 * search form
 * @constructor
 * @extends {Backbone.View}
 */
localemaps.www.SearchFormView = Backbone.View.extend({
  events: {
    'submit #search-form': 'submitSearch_'
  },
  /**
   * Initializes the view.
   * @param {Object.<string, object>} options An object where 'model' is set to
   *   to a @see {localemaps.www.SearchResults} instance.
   * @override
   */
  initialize: function(options) {
    var self = this;
    if (!('placeholder' in document.createElement('input'))) {
      new localemaps.GhostLabel(this.el.find('.input'), 'Find a congregation');
    }
    this.el.on(
      'submit',
      function(e) {
        self.submitSearch_(e);
      });
  },
  /**
   * Submits a search request.
   * @param {Object} e Event object
   * @private
   */
  submitSearch_: function(e) {
    var self = this;
    e.preventDefault();
    var query = $.trim(this.el.find('.input').val());
    if (query) {
      this.model.set(
        { query: query },
        { silent: true }
      );
      this.model.fetch();
    }
  }
});