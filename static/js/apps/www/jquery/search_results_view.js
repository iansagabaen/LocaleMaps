/**
 * @fileoverview Defines a SearchResults Backbone view that wraps around the
 *   Search Results module used on the localemaps.com home page.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.www');

/** @define {string} */
var FILTER_CHANGE = 'filter-change';
/** @define {string} */
var GEOCODE = 'geocode';
/** @define {string} */
var HIDE = 'hide';
/** @define {string} */
var LINEAR = 'linear';
/** @define {string} */
var NARROW_SEARCH = 'narrow-search';
/** @define {string} */
var OPERA_TRANSITION_END = 'oTransitionEnd';
/** @define {string} */
var POINT_DOWN = 'point-down';
/** @define {string} */
var POINT_RIGHT = 'point-right';
/** @define {string} */
var PRESSED = 'pressed';
/** @define {number} */
var SEARCH_ANIM_DURATION = 250;
/** @define {string} */
var SHOW = 'show';
/** @define {string} */
var TOGGLE = 'toggle';
/** @define {string} */
var TRANSITION_END = 'transitionend';
/** @define {string} */
var WEBKIT_TRANSITION_END = 'webkitTransitionEnd';
/** @define {string} */
var ZOOM = 'zoom';

/**
 * Wrapper around the #search-results element, which handles display of search
 * results and related functionality (ex. filtering, etc.).
 * @constructor
 * @extends {Backbone.View}
 */
localemaps.www.SearchResultsView = Backbone.View.extend({
  events: {
    'click .close': 'hide_',
    'click .filter input[type=checkbox]': 'handleFilterClick_',
    'click .narrow-search': 'toggleFilters_',
    'click .reset': 'handleResetClick_',
    'click .toggle': 'toggleFilters_',
    'click .zoom': 'fireZoomEvent_'
  },
  /**
   * Initializes the view.
   * @param {Object.<string, object>} options An object where 'model' is set to
   *   to a @see {localemaps.www.SearchResults} instance.
   * @override
   */
  initialize: function(options) {
    var self = this;
    options.model.bind('change', this.render, this);
    $(window).on(
      'resize',
      function(e) {
        self.resize_(e);
      });
    this.resize_();
  },
  /**
   * Creates the DOM representing the search results (ie. filters, results
   * list, query, etc.)
   * @override
   */
  render: function() {
    // Get JSON.  If results && results.length, render template normally.
    // Otherwise, attempt to Geocode the query.  If successful, fire geocode
    // event, and have MapView center map at given coordinates, zoomed in.
    var contentElt = this.el.find('.content');
    var modelJson = this.model.toJSON();
    var self = this;
    if (modelJson.results && modelJson.results.length) {
      soy.renderElement(
        contentElt.get(0),
        localemaps.templates.searchResults,
        modelJson);
      this.show_();
      // If there's only one locale in the results, automatically zoom to
      // that locale.
      if (modelJson.results.length == 1) {
        this.trigger(
          ZOOM, 
          {
            id: parseInt(modelJson.results[0].id)
          });
      }
    } else {
      if (!this.geocoder_) {
        /**
         * Wrapper around Google Geocoding service.
         * @type {google.maps.Geocoder}
         * @private
         */
        this.geocoder_ = new google.maps.Geocoder();
      }
      this.geocoder_.geocode(
        {
          address: modelJson.query
        },
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var result = (results && results.length) ? results[0] : null;
            if (result) {
              self.trigger(GEOCODE, result);
            }
            modelJson['geocode'] = true;
            modelJson['formattedAddress'] =
              result.formatted_address || modelJson.query;
          }
          soy.renderElement(
            contentElt.get(0),
            localemaps.templates.searchResults,
            modelJson);
          self.show_();
        });
    }
  },
  /**
   * Handles clicks on any of the filter buttons
   * @param {Object} e Event object
   * @private
   */
  handleFilterClick_: function(e) {
    // Get the state of all the filters as an object.  Then trigger a
    // filter-change event, and update the model.  The success handler should
    // render an updated results list.
    var target = $(e.target),
        clickedValue = parseInt(target.attr('value')),
        filterType = target.attr('name'),
        filters = this.model.get('filters'),
        filtersByType = filters[filterType],
        self = this;
    for (var i = 0; i < filtersByType.length; i++) {
      var filter = filtersByType[i];
      if (filter.value == clickedValue) {
        filter.enabled = target.is(':checked');
      }
    }
    this.updateModelWithFilters_(filters);
    this.trigger(FILTER_CHANGE, filters);
  },
  /**
   * Handles clicks on the 'Reset' filters button.
   * @param {Object} e Event object
   * @private
   */
  handleResetClick_: function(e) {
    // Reset states of all buttons, update model, and fire off fetch.
    this.el.find('.filter input[type=checkbox]').attr('checked', true);
    this.trigger(FILTER_CHANGE, filters);
    var filters = this.model.get('filters');
    for (var filterType in filters) {
      var filtersByType = filters[filterType];
      for (var i = 0; i < filtersByType.length; i++) {
        filtersByType[i].enabled = true;
      }
    }
    this.updateModelWithFilters_(filters);
    this.trigger(FILTER_CHANGE, filters);
  },
  /**
   * Fires 'zoom' event, providing subscribers the ID of the locale to magnify
   * @param {Object} e Event object
   * @private
   */
  fireZoomEvent_: function(e) {
    var target = $(e.target);
    var idElement = target.closest('li[data-lm-id]');
    if (idElement) {
      e.preventDefault();
      this.trigger(
        ZOOM, 
        {
          id: parseInt(idElement.attr('data-lm-id'))
        });
    }
  },
  /**
   * Hides the Search Results from being visible.
   * @private
   */
  hide_: function() {
    if (this.supportsTransitions_()) {
      this.el.removeClass(SHOW).addClass(HIDE);
      this.trigger(HIDE);
    } else {
      var self = this;
      this.el.animate(
        { width: '0'},
        SEARCH_ANIM_DURATION,
        LINEAR,
        function() {
          self.trigger(HIDE);
          self.el.removeClass(SHOW).addClass(HIDE);
        });
    }
  },
  /**
   * Resizes the search results view (height only), based on the viewport.
   * @private
   */
  resize_: function() {
    var contentHeight = $(BODY).height() -
                        localemaps.www.HomePage.HEADER_FOOTER_HEIGHT;
    if (contentHeight) {
      this.el.height(contentHeight);
      var filter = this.el.find('.filter');
      var headerContainer = this.el.find('.header-container');
      var resultsListElt = this.el.find('.results-list');
      if (filter) {
        resultsListElt.height(contentHeight - (filter.outerHeight() + headerContainer.outerHeight()));
      } else if (resultsListElt) {
        resultsListElt.height('100%');
      }
    }
  },
  /**
   * Shows the search results view.
   * @private
   */
  show_: function() {
    var self = this;
    if (this.el.hasClass(SHOW)) {
      this.resize_();
      return;
    }
    if (this.supportsTransitions_()) {
      var transitionEndEvent = TRANSITION_END;
      if ($.browser.webkit) {
        transitionEndEvent = WEBKIT_TRANSITION_END;
      } else if ($.browser.opera) {
        transitionEndEvent = OPERA_TRANSITION_END;
      }
      $(this.el).one(
        transitionEndEvent,
        function(e) {
          self.resize_(e);
        });
      this.el.removeClass(HIDE).addClass(SHOW);
      this.trigger(SHOW);
    } else {
      this.el.animate(
        { width: '300px'},
        SEARCH_ANIM_DURATION,
        LINEAR,
        function() {
          self.trigger(SHOW);
          self.el.removeClass(HIDE).addClass(SHOW);
          self.resize_();
        });
    }
  },
  /**
   * Determines if CSS3 transitions are supported
   * @return {boolean} true if supported, false otherwise
   * @private
   */
  supportsTransitions_: function() {
    if ($.browser.mozilla) {
      return parseFloat($.browser.version.replace('b', '')) >= 4;
    } else if ($.browser.webkit) {
      return parseFloat($.browser.version.replace('+', '')) >= 533;
    } else if ($.browser.opera) {
      return parseFloat($.browser.version) >= 10.5;
    }
  },
  /**
   * Toggles display of search result filters.
   * @param {Object} e Event object
   * @private
   */
  toggleFilters_: function(e) {
    var target = $(e.target);
    if (target.hasClass(NARROW_SEARCH) || target.hasClass(TOGGLE)) {
      e.preventDefault();
      if (target.hasClass(NARROW_SEARCH)) {
        target = this.el.find('.toggle');
      }
      var actionsElt = this.el.find('.filter');
      if (this.supportsTransitions_()) {
        var self = this;
        var transitionEndEvent = TRANSITION_END;
        if ($.browser.webkit) {
          transitionEndEvent = WEBKIT_TRANSITION_END;
        } else if ($.browser.opera) {
          transitionEndEvent = OPERA_TRANSITION_END;
        }
        target.one(
          transitionEndEvent,
          function(e) {
            self.resize_(e);
          });
      }
      if (target.hasClass(POINT_DOWN)) {
        target.removeClass(POINT_DOWN).addClass(POINT_RIGHT);
        actionsElt.removeClass(SHOW).addClass(HIDE);
      } else {
        target.removeClass(POINT_RIGHT).addClass(POINT_DOWN);
        actionsElt.removeClass(HIDE).addClass(SHOW);
      }
      if (!this.supportsTransitions_()) {
        this.resize_();
      }
    }
  },
  /**
   * Updates associated model with specified filters data, and calls fetch()
   * on the model, with the success callback updating the search results.
   * @param {Object.<string, Array.<Object>>} filters Object with the
   *   following keys:
   *   <ul>
   *     <li>day_of_week</li>
   *     <li>time</li>
   *   </ul>
   * @private
   */
  updateModelWithFilters_: function(filters) {
    var self = this;
    this.model.set({ filters: filters }, { silent: true });
    this.model.fetch({
      error: function(response) {},
      silent: true,
      success: function(response) {
        // Update search results list and header text, reflecting number of
        // locales found.
        var resultsListElt = self.el.find('.results-list');
        soy.renderElement(
          resultsListElt.get(0),
          localemaps.templates.searchResultsList,
          self.model.toJSON());
        var searchResults = self.model.get('results');
        var header = self.el.find('.header-container h2');
        // TODO(rcruz): i18n.
        var headerContent = (searchResults.length == 1) ?
            'We filtered down your search to 1 congregation.' :
            [
              'We filtered down your search to ',
              searchResults.length,
              ' congregations.'
            ].join('');
        header.html(headerContent);
      }
    });
  }
});
