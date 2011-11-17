/**
 * @fileoverview Defines a SearchResults Backbone view that wraps around the
 *   Search Results module used on the localemaps.com home page.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.www');

/** @define {number} */
var DAYS_ONLY_FILTER_VALUE = 127;
/** @define {string} */
var HIDE = 'hide';
/** @define {string} */
var LINEAR = 'linear';
/** @define {string} */
var NARROW_SEARCH = 'narrow-search';
/** @define {number} */
var NO_FILTER_VALUE = 511;
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
/** @define {number} */
var TIME_ONLY_FILTER_VALUE = 384;
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
    'click .filter .actions li': 'handleFilterClick_',
    'click .narrow-search': 'toggleFilters_',
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
    this.filter_ = NO_FILTER_VALUE;
  },
  /**
   * Renders the view
   * @return {localemaps.www.SearchResultsView}
   * @override
   */
  render: function() {
    this.resetFilters_();
    this.renderContent_();
  },
  /**
   * Handles clicks on any of the filter buttons
   * @param {Object} e Event object
   * @private
   */
  handleFilterClick_: function(e) {
    e.preventDefault();
    var target = $(e.target);
    var filterValue = parseInt(target.attr('data-li-filter'));
    target.toggleClass(PRESSED);
    if (target.hasClass(PRESSED)) {
      this.filter_ += filterValue;
    } else {
      this.filter_ -= filterValue;
    }
    this.filterResults_();
    this.renderResultsList_();
  },
  /**
   * Filters the SearchResults model, based on user-selected filter criteria.
   * @private
   */
  filterResults_: function() {
    var results = this.model.get('results');
    for (var i = 0; i < results.length; ++i) {
      var result = results[i];
      result.isVisible = this.shouldResultBeVisible_(result);
    }
    this.model.set({ results: results }, { silent: true });
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
   * Creates the DOM representing the search results (ie. filters, results
   * list, query, etc.)
   * @private
   */
  renderContent_: function() {
    var contentElt = this.el.find('.content');
    soy.renderElement(
      contentElt.get(0),
      localemaps.templates.searchResults,
      this.model.toJSON());
    this.show_();
  },
  /**
   * Renders the list of locales only (ie. filters aren't affected in this
   * method).
   * @private
   */
  renderResultsList_: function() {
    var resultsListElt = this.el.find('.results-list');
    soy.renderElement(
      resultsListElt.get(0),
      localemaps.templates.searchResultsList,
      this.model.toJSON());
  },
  /**
   * Removes all filtering applied to search results.
   * @private
   */
  resetFilters_: function() {
    this.el.find('.filter .actions .li').removeClass(PRESSED);
    this.filter_ = NO_FILTER_VALUE;
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
      var resultsListElt = this.el.find('.results-list');
      if (filter) {
        resultsListElt.height(contentHeight - filter.height());
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
   * Determines if a given search result should be visible, based on
   * user-selected filtering.
   * @param {Object.<string|Object>} result JSON representation of a result.
   * @return {boolean} true if should be visible, false otherwise
   * @private
   */
  shouldResultBeVisible_: function(result) {
    var services = result.services;
    if (services) {
      for (var dayOfWeek in services) {
        var servicesPerDay = services[dayOfWeek];
        for (var j = 0; j < servicesPerDay.length; ++j) {
          var filter = parseInt(servicesPerDay[j].filterValue);
          var dayValue = filter & DAYS_ONLY_FILTER_VALUE;
          var isVisible = true;
          if (!!(dayValue & this.filter_)) {
            var timeValue = filter & TIME_ONLY_FILTER_VALUE;
            isVisible = !!(timeValue & this.filter_);
          } else {
            isVisible = false;
          }
          if (isVisible) {
            return true;
          }
        }
      }
    }
    return false;
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
      var actionsElt = this.el.find('.filter .actions');
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
  }
});
