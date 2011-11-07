// TODO:
// - Implement filtering
//   - When doing subsequent requests, ensure filters are still applied.
// - Add closure wrapper around JS.
// - Document the code

if (!window.localemaps) { window.localemaps = {}; }
if (!localemaps.www) { localemaps.www = {}; }

var DAYS_ONLY_FILTER_VALUE = 127;
var HIDE = 'hide';
var LINEAR = 'linear';
var NARROW_SEARCH = 'narrow-search';
var NO_FILTER_VALUE = 511;
var OPERA_TRANSITION_END = 'oTransitionEnd';
var POINT_DOWN = 'point-down';
var POINT_RIGHT = 'point-right';
var PRESSED = 'pressed';
var SEARCH_ANIM_DURATION = 250;
var SHOW = 'show';
var TIME_ONLY_FILTER_VALUE = 384;
var TOGGLE = 'toggle';
var TRANSITION_END = 'transitionend';
var WEBKIT_TRANSITION_END = 'webkitTransitionEnd';
var ZOOM = 'zoom';

localemaps.www.SearchResultsView = Backbone.View.extend({
  events: {
    'click .close': 'hide_',
    'click .filter .actions li': 'handleFilterClick_',
    'click .narrow-search': 'toggleFilters_',
    'click .toggle': 'toggleFilters_',
    'click .zoom': 'fireZoomEvent_'
  },
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
  render: function() {
    this.resetFilters_();
    this.renderContent_();
  },
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
  filterResults_: function() {
    var results = this.model.get('results');
    for (var i = 0; i < results.length; ++i) {
      var result = results[i];
      result.isVisible = this.shouldResultBeVisible_(result);
    }
    this.model.set({ results: results }, { silent: true });
  },
  fireZoomEvent_: function(e) {
    var target = $(e.target);
    var idElement = target.closest('li[data-lm-id]');
    if (idElement) {
      e.preventDefault();
      var coords = idElement.attr('data-lm-coords').split(',');
      coords[0] = parseFloat(coords[0]);
      coords[1] = parseFloat(coords[1]);
      this.trigger(
        ZOOM, 
        {
          id: parseInt(idElement.attr('data-lm-id')),
          coords: coords
        });
    }
  },
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
  renderContent_: function() {
    var contentElt = this.el.find('.content');
    soy.renderElement(
      contentElt.get(0),
      localemaps.templates.searchResults,
      this.model.toJSON());
    this.show_();
  },
  renderResultsList_: function() {
    // console.log('renderResultsList_()');
    var resultsListElt = this.el.find('.results-list');
    soy.renderElement(
      resultsListElt.get(0),
      localemaps.templates.searchResultsList,
      this.model.toJSON());
  },
  resetFilters_: function() {
    this.el.find('.filter .actions .li').removeClass(PRESSED);
    this.filter_ = NO_FILTER_VALUE;
  },
  resize_: function(e) {
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
  supportsTransitions_: function() {
    if ($.browser.mozilla) {
      return parseFloat($.browser.version.replace('b', '')) >= 4;
    } else if ($.browser.webkit) {
      return parseFloat($.browser.version.replace('+', '')) >= 533;
    } else if ($.browser.opera) {
      return parseFloat($.browser.version) >= 10.5;
    }
  },
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

_.extend(localemaps.www.SearchResultsView, Backbone.Events);