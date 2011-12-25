/**
 * @fileoverview Defines a SearchResults Backbone view that wraps around the
 *   Search Results module used on the localemaps.com home page.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.www');

/** @define {number} */
//var DAYS_ONLY_FILTER_VALUE = 127;
/** @define {string} */
var FILTER_CHANGE = 'filter-change';
/** @define {string} */
var HIDE = 'hide';
/** @define {string} */
var LINEAR = 'linear';
/** @define {string} */
var NARROW_SEARCH = 'narrow-search';

/** @define {number} */
//var NO_FILTER_VALUE = 511;

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
//var TIME_ONLY_FILTER_VALUE = 384;

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
   * Renders the view
   * @return {localemaps.www.SearchResultsView}
   * @override
   */
  render: function() {
    this.renderContent_();
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
    this.trigger(FILTER_CHANGE, filters);
    this.updateModelWithFilters(filters);
  },
  /**
   * Handles clicks on the 'Reset' filters button.
   * @param {Object} e Event object
   * @private
   */
  handleResetClick_: function(e) {
    // Reset states of all buttons, update model, and fire off fetch.
    this.el.find('.filter input[type=checkbox]').prop('checked', true);
    this.trigger(FILTER_CHANGE, filters);
    var filters = this.model.get('filters');
    for (var filterType in filters) {
      var filtersByType = filters[filterType];
      for (var i = 0; i < filtersByType.length; i++) {
        filtersByType[i].enabled = true;
      }
    }
    this.trigger(FILTER_CHANGE, filters);
    this.updateModelWithFilters(filters);
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
    /*
    this.el.find('.filter .li').removeClass(PRESSED);
    this.filter_ = NO_FILTER_VALUE;
    */
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
  updateModelWithFilters: function(filters) {
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
            'Found 1 locale.' :
            ['Found ', searchResults.length, ' locales.'].join('');
        header.html(headerContent);
      }
    });
  }
});
