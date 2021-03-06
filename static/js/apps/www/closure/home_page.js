/**
 * @fileoverview Defines a HomePageManager class, that handles all interaction
 *   on the Locale Maps home page.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

// TODO(rcruz):
// - Consolidate handling of clicks for search results
//   (ie. handleSearchResultsClick_).
// - Implement filtering.
// - Fix action buttons (Zoom In/Get Directions) for each search results entry.
// - Switch to Soy templates/integrate Backbone.js (break out search results
//   into separate class).
// - Map markers: switch to displaying services from event table.
// - Add dots above/below knob for hiding search results.

goog.provide('localemaps.www');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.fx.dom');
goog.require('goog.net.XhrIo');
goog.require('goog.string');
goog.require('goog.style');
goog.require('goog.userAgent');

/** @define {string} */
var BLOCK = 'block';
/** @define {string} */
var DISPLAY = 'display';
/** @define {number} Duration (in milliseconds) of fading in/out effects. */
var FADE_DURATION = 200;
/** @define {number} The height of the header and footer, in pixels. */
var HEADER_FOOTER_HEIGHT = 99;
/** @define {string} */
var HIDE = 'hide';
/** @define {string} Markup for displaying a loading spinner. */
var LOADING_CONTENT = '<div class="loading"><img src="/img/loader.gif"></div>';
/** @define {string} */
var MARGIN_RIGHT = 'margin-right';
/** @define {string} */
var NARROW_SEARCH = 'narrow-search';
/** @define {string} */
var POINT_DOWN = 'point-down';
/** @define {string} */
var POINT_RIGHT = 'point-right';
/**
 * @define {number} Duration (in milliseconds) of animating in/out
 *   search results.
 */
var SEARCH_ANIM_DURATION = 250;
/** @define {string} */
var SHOW = 'show';
/** @define {string} */
var TOGGLE = 'toggle';
/** @define {string} */
var UNDEFINED = 'undefined';
/** @define {string} */
var WITH_SEARCH_RESULTS = 'with-search-results';
/** @define {string} */
var WITHOUT_SEARCH_RESULTS = 'without-search-results';
/** @define {string} */
var ZOOM = 'zoom';


/**
 * Constructs a HomePageManager instance.
 * @constructor
 * @param {Array.<Object.<Object.<string, string>>>} List of locales
 */
localemaps.www.HomePageManager = function(locales) {
  /**
   * Indicates if user is viewing the disclaimer for the first time.
   * @type {boolean}
   * @private
   */
  this.disclaimerShownOnce_ = false;

  /**
   * Cache of XHR responses when clicking on locale map markers.
   * @type {Object.<string, string>}
   * @private
   */
  this.localeInfo_ = {};

  /**
   * List of locales
   * @type {Array.<<Object.<Object.<string, string>>>>}
   * @private
   */
  this.locales_ = locales;

  /**
   * DOM element containing Google Maps instance.
   * @type {Element}
   * @private
   */
  this.map_ = goog.dom.getElement('map');

  /**
   * DOM element containing search results.
   * @type {Element}
   * @private
   */
  this.searchResults_ = goog.dom.getElement('search-results');
  goog.events.listen(
      this.searchResults_,
      goog.events.EventType.CLICK,
      this.handleSearchResultsClick_,
      false,  // Listen during bubble phase.
      this);

  // Resize the content area, get the user's location, and initialize the map.
  // Then add the Facebook iframe
  this.resizeContent_();
  this.getLocation_(this.initializeMap_);
  goog.events.listen(
      goog.dom.getWindow(),
      goog.events.EventType.RESIZE,
      this.resizeContent_,
      false,  // Listen during bubble phase.
      this);
  var fbIframe = goog.dom.getElement('fb-iframe');
  fbIframe.src =
    'http://www.facebook.com/plugins/like.php?href=localemaps.com&amp;layout=standard&amp;show_faces=false&amp;action=like&amp;colorscheme=light';
  goog.events.listen(
    this.map_,
    goog.events.EventType.CLICK,
    this.handleMapClick_,
    false,
    this);

  /**
   * 'form' element around the search UI.
   * @type {Element}
   * @private
   */
  this.searchForm_ = goog.dom.getElement('search-form');
  goog.events.listen(
    this.searchForm_,
    goog.events.EventType.SUBMIT,
    this.submitSearch_,
    false,
    this);

  if (!('placeholder' in goog.dom.getDocument().createElement('input'))) {
    /**
     * 'input' element containing search query.
     * @type {Element}
     * @private
     */
    this.searchQuery_ = goog.dom.getElementsByTagNameAndClass(
        null, 'input', this.searchForm_)[0];
    new localemaps.GhostLabel(this.searchQuery_, 'Find a congregation');
  }

  /**
   * 'Show Disclaimer' element.
   * @type {Element}
   * @private
   */
  this.disclaimer_ = goog.dom.getElement('show-disclaimer');
  goog.events.listen(
    this.disclaimer_,
    goog.events.EventType.CLICK,
    this.showDisclaimer_,
    false,
    this);
};

/**
 * The coordinates of the geographic center of the United States (near
 * Lebanon, Kansas).
 * @type {Array.<number>}
 * @private
 */
localemaps.www.HomePageManager.UNITED_STATES_CENTER_ = [39.5, 98.35];


/**
 * Google Maps instance.
 * @type {google.maps.Map}
 * @private
 */
localemaps.www.HomePageManager.prototype.googleMap_;

/**
 * Google Maps InfoWindow instance.
 * @type {google.maps.InfoWindow}
 * @private
 */
localemaps.www.HomePageManager.prototype.infoWindow_;

/**
 * Transparent mask shown over the entire document.
 * @type {Element}
 * @private
 */
localemaps.www.HomePageManager.prototype.mask_;

/**
 * The search results content element.
 * @type {Element}
 * @private
 */
localemaps.www.HomePageManager.prototype.searchResultsContent_;

/**
 * Adds event handling to the specified Google Maps Marker.
 * @param {google.maps.Marker} marker The marker to add event handling to.
 * @type private
 */
localemaps.www.HomePageManager.prototype.addMarkerEventHandling_ =
    function(marker) {
  var self = this;
  google.maps.event.addListener(
    marker,
    goog.events.EventType.CLICK,
    function(e) {
      if (typeof self.infoWindow_ == UNDEFINED) {
        self.infoWindow_ = new google.maps.InfoWindow({
            'content': '',
            'maxWidth': 350
          });
      }
      if (self.localeInfo_[marker.localeId]) {
        self.infoWindow_.setContent(self.localeInfo_[marker.localeId]);
        self.infoWindow_.open(self.googleMap_, marker);
      } else {
        self.infoWindow_.setContent(LOADING_CONTENT);
        self.infoWindow_.open(self.googleMap_, marker);
        goog.net.XhrIo.send(
            '/locales/' + marker.localeId,
            function(e) {
              self.displayLocaleInfo_(e, marker);
            });
      }
    });
};

/**
 * Centers the disclaimer dialog relative to the viewport.
 * @private
 */
localemaps.www.HomePageManager.prototype.centerDisclaimer_ = function() {
  var bodySize = goog.style.getSize(goog.dom.getDocument().body);
  var disclaimerSize = goog.style.getSize(this.disclaimer_);
  goog.style.setPosition(
      this.disclaimer_,
      ((bodySize.width / 2) - (disclaimerSize.width / 2)),
      ((bodySize.height / 2) - (disclaimerSize.height / 2)));
};

/**
 * Displays the locale info in the Google Maps info window.
 * @param {Object} e The event object.
 * @param {google.maps.Marker} The marker to pin the info window to.
 * @private
 */
localemaps.www.HomePageManager.prototype.displayLocaleInfo_ =
    function(e, marker) {
  var content = e.target.getResponseText();
  this.localeInfo_[marker.localeId] = content;
  this.infoWindow_.setContent(content);
  this.infoWindow_.open(this.googleMap_, marker);
};

/**
 * Gets the coordinates of the user's location, and executes callback function.
 * @type {Function} callback Method to execute after getting user's location.
 * @private
 */
localemaps.www.HomePageManager.prototype.getLocation_ = function(callback) {
  // Check for location in the following order:
  // - Google geo IP location (called by Google API loader).
  // - MaxMind (called in a separate script).
  // - Use native geo-location (if supported).
  // - Otherwise, use the center of the United States.
  if (google.loader.ClientLocation != null) {
    callback.call(
        this,
        [
          google.loader.ClientLocation.latitude,
          google.loader.ClientLocation.longitude
        ]);
  } else if (geoip_latitude && geoip_longitude) {
    callback.call(
        this,
        [
          geoip_latitude(),
          geoip_longitude()
        ]);
  } else if (navigator.geolocation) {
    var self = this;
    navigator.geolocation.getCurrentPosition(
        function(position) {
          callback.call(
            self,
            [
              position.coords.latitude,
              position.coords.longitude
            ]);
        },
        function() {
          callback.call(
              self,
              localemaps.www.HomePageManager.UNITED_STATES_CENTER_);
        });
  } else {
    callback.call(
        this,
        localemaps.www.HomePageManager.UNITED_STATES_CENTER_);
  }
};

/**
 * Handles a click on the info window.
 * @param {Object} e Event object.
 * @private
 */
localemaps.www.HomePageManager.prototype.handleMapClick_ = function(e) {
  // If clicking on the "Zoom In" element, get the coordinates, and zoom in
  // to the marker's location.
  var target = e.target;
  if (goog.dom.classes.has(target, ZOOM)) {
    var coords = target.getAttribute('data-lm-coords').split(',');
    coords[0] = parseFloat(coords[0]);
    coords[1] = parseFloat(coords[1]);
    var id = parseInt(target.getAttribute('data-lm-id'));
    var marker = this.markers_[id];
    this.zoomMap_(coords,
                  marker,
                  15);  // zoom level
  }
};

/**
 * Hides the Disclaimer dialog.
 * @param {Object} e Event object.
 * @private
 */
localemaps.www.HomePageManager.prototype.hideDisclaimer_ = function(e) {
  e.preventDefault();
  goog.style.showElement(this.mask_, false);
  goog.style.showElement(this.disclaimer_, false);
};

/**
 * Handles clicks on #search-results and its children, delegating according to
 * the actual target.
 * @param {Object} e Event object.
 * @private
 */
localemaps.www.HomePageManager.prototype.handleSearchResultsClick_ =
    function(e) {
  var target = e.target;
  if (goog.dom.classes.has(target, 'close')) {
    e.preventDefault();
    this.hideSearchResults_();
  } else if (goog.dom.classes.has(target, NARROW_SEARCH) ||
             goog.dom.classes.has(target, TOGGLE)) {
    e.preventDefault();
    if (goog.dom.classes.has(target, NARROW_SEARCH)) {
      target = goog.dom.getElementByClass(TOGGLE, this.searchResults_);
    }
    var actionsElt = goog.dom.getElementByClass('actions', this.searchResults_);
    if (goog.dom.classes.has(target, POINT_DOWN)) {
      goog.dom.classes.swap(target, POINT_DOWN, POINT_RIGHT);
      goog.dom.classes.swap(actionsElt, SHOW, HIDE);
    } else {
      goog.dom.classes.swap(target, POINT_RIGHT, POINT_DOWN);
      goog.dom.classes.swap(actionsElt, HIDE, SHOW);
    }
    this.resizeContent_();
  }
};

/**
 * Hides the search results panel.
 * @private
 */
localemaps.www.HomePageManager.prototype.hideSearchResults_ = function() {
  this.searchResultsContent_.innerHTML = '';
  if (this.supportsCssTransitions_()) {
    goog.dom.classes.swap(this.map_,
                          WITH_SEARCH_RESULTS,
                          WITHOUT_SEARCH_RESULTS);
    goog.dom.classes.swap(this.searchResults_, SHOW, HIDE);
  } else {
    var startSize = goog.style.getSize(this.searchResults_);
    var anim = new goog.fx.dom.Resize(
      this.searchResults_,
      [startSize.width, startSize.height],
      [0, startSize.height],
      SEARCH_ANIM_DURATION);
    var self = this;
    anim.onEnd = function() {
      goog.style.setStyle(self.map_, MARGIN_RIGHT, '0');
      goog.style.setSize(self.searchResults_, 0, startSize.height);
    };
    anim.play();
  }
};

/**
 * Initializes Google Maps instance.
 * @param {Array.<number>} 2-element array containing lat/long of where
 *    to center the map.
 * @private
 */
localemaps.www.HomePageManager.prototype.initializeMap_ = function(center) {
  // Initialize the map.  Then add all the markers, including event handling.
  // Keep a local cache of all the markers, based on locale ID.
  this.googleMap_ = new google.maps.Map(
      this.map_,
      {
        'center': new google.maps.LatLng(center[0], center[1]),
        'mapTypeId': google.maps.MapTypeId.ROADMAP,
        'zoom': 8
      });
  this.markers_ = {};
  for (var i = 0; i < this.locales_.length; i++) {
    var locale = this.locales_[i]['Locale']
    if (locale['gla'] && locale['gln']) {
      var latLng = new google.maps.LatLng(locale['gla'], locale['gln']);
      var marker = new google.maps.Marker({
          'map': this.googleMap_,
          'position': latLng
        });
      marker.localeId = locale.id;
      this.markers_[locale.id] = marker;
      this.addMarkerEventHandling_(marker);
    }
  }
};

/**
 * Resizes the height of the content (ie. non-header/non-footer) elements, so
 * that they fit between the header and footer.
 * @private
 */
localemaps.www.HomePageManager.prototype.resizeContent_ = function() {
  var bodySize = goog.style.getSize(goog.dom.getDocument().body);
  var contentHeight = bodySize.height - HEADER_FOOTER_HEIGHT;
  if (contentHeight) {
    goog.style.setHeight(this.map_, contentHeight);
    goog.style.setHeight(this.searchResults_, contentHeight);

    // If we have a search filter element, resize the .results-list in px.
    // Otherwise, just set it to 100% height.
    var searchFilterElt =
      goog.dom.getElementByClass('filter', this.searchResults_);
    var resultsListElt =
      goog.dom.getElementByClass('results-list', this.searchResults_);
    if (searchFilterElt) {
      var filterSize = goog.style.getSize(searchFilterElt);
      var resultsListHeight = contentHeight - filterSize.height;
      goog.style.setHeight(resultsListElt, resultsListHeight);
    } else {
      if (resultsListElt) {
        goog.style.setHeight(resultsListElt, '100%');
      }
    }

    // If showing the mask (from the Disclaimer), center the Disclaimer.
    if ((typeof this.mask_ != UNDEFINED) &&
      goog.style.isElementShown(this.mask_)) {
      this.centerDisclaimer_();
    }
  }
};

/**
 * Shows the Disclaimer dialog.
 * @param {Object} e Event object.
 * @private
 */
localemaps.www.HomePageManager.prototype.showDisclaimer_ = function(e) {
  e.preventDefault();
  if (typeof this.mask_ == UNDEFINED || typeof this.disclaimer_ == UNDEFINED) {
    // If showing for the first time, initialize the mask and disclaimer, and
    // set up event handling on the mask and close button, which will hide
    // the disclaimer on click.
    this.mask_ = goog.dom.getElement('mask');
    this.disclaimer_ = goog.dom.getElement('disclaimer');
    if (!this.disclaimerShownOnce_) {
      goog.events.listen(
        this.mask_,
        goog.events.EventType.CLICK,
        this.hideDisclaimer_,
        null,
        this);
      goog.events.listen(
        goog.dom.getElementsByTagNameAndClass(
            null, 'close', this.disclaimer_)[0],
        goog.events.EventType.CLICK,
        this.hideDisclaimer_,
        null,
        this);
    }
  }

  // Center the disclaimer in the viewport and fade everything in.
  this.centerDisclaimer_();
  var maskAnim = new goog.fx.dom.Fade(
      this.mask_,
      0,  // Start opacity
      0.8,  // End opacity
      FADE_DURATION);
  goog.events.listen(
    maskAnim,
    goog.fx.Transition.EventType.BEGIN,
    function() {
      goog.style.setStyle(this.mask_, DISPLAY, BLOCK);
      goog.style.setStyle(this.disclaimer_, DISPLAY, BLOCK);
    },
    false,
    this);
  var disclaimerAnim = new goog.fx.dom.FadeIn(
      this.disclaimer_,
      FADE_DURATION);
  maskAnim.play();
  disclaimerAnim.play();
  this.disclaimerShownOnce_ = true;
};

/**
 * Shows the search results panel.
 * @param {Object} e Event object.
 * @private
 */
localemaps.www.HomePageManager.prototype.showSearchResults_ = function(e) {
  // Add to the DOM the search results, then set up event handling to hide
  // the disclaimer.  Use CSS transitions, if supported.  Otherwise, use
  // Closure to scroll in the results.
  if (typeof this.searchResultsContent_ == UNDEFINED) {
    this.searchResultsContent_ = goog.dom.getElementsByTagNameAndClass(
      '', 'content', this.searchResults_)[0];
  }
  this.searchResultsContent_.innerHTML = e.target.getResponseText();
  if (this.supportsCssTransitions_()) {
    if (goog.dom.classes.has(this.searchResults_, HIDE)) {
      var transitionEndEvent;
      if (goog.userAgent.WEBKIT) {
        transitionEndEvent = 'webkitTransitionEnd';
      } else if (goog.userAgent.OPERA) {
        transitionEndEvent = 'oTransitionEnd';
      } else {
        transitionEndEvent = 'transitionend';
      }
      goog.events.listenOnce(
        this.searchResults_,
        transitionEndEvent,
        this.resizeContent_,
        null,
        this);
      if (goog.dom.classes.has(this.map_, WITHOUT_SEARCH_RESULTS)) {
        goog.dom.classes.swap(this.map_,
                              WITHOUT_SEARCH_RESULTS,
                              WITH_SEARCH_RESULTS);
      } else {
        goog.dom.classes.set(this.map_, WITH_SEARCH_RESULTS);
      }
      goog.dom.classes.swap(this.searchResults_, HIDE, SHOW);
    } else {
      this.resizeContent_();
    }
  } else {
    var startSize = goog.style.getSize(this.searchResults_);
    // Width taken from #search-results.show in search_results.css
    var anim = new goog.fx.dom.Resize(
      this.searchResults_,
      [startSize.width, startSize.height],
      [300, startSize.height],
      SEARCH_ANIM_DURATION);
    var self = this;
    anim.onEnd = function() {
      goog.style.setSize(self.searchResults_, 300, startSize.height);
      goog.style.setStyle(self.map_, MARGIN_RIGHT, '300px');
      self.resizeContent_();
    };
    anim.play();
  }
};

/**
 * Submits search request.
 * @param {Object} e Event object.
 * @private
 */
localemaps.www.HomePageManager.prototype.submitSearch_ = function(e) {
  // Cancel default action, get a trimmed query, and send an XHR request.
  e.preventDefault();
  var query = goog.string.trim(goog.dom.getElementsByTagNameAndClass(
    null, 'input', this.searchForm_)[0].value);
  if (query) {
    var self = this;
    goog.net.XhrIo.send(
      '/search?q=' + goog.string.urlEncode(query),
      function(e) {
        self.showSearchResults_(e);
      });
  }
};

/**
 * Checks if the user agent supports using CSS3 transitions.
 * @return {boolean}
 * @private
 */
localemaps.www.HomePageManager.prototype.supportsCssTransitions_ = function() {
  // TODO: Add Opera support
  if (goog.userAgent.GECKO) {
    // Remove the 'b' that's present if using a beta version.
    return parseInt(goog.userAgent.VERSION.replace('b', '')) > 4;
  } else if (goog.userAgent.WEBKIT) {
    // Remove the '+' that's present if using a Webkit nightly.
    return parseFloat(goog.userAgent.VERSION.replace('+', '')) >= 533;
  }
  return false;
};

/**
 * Focuses the Google Map at the desired coordinates and zoom level, and
 * shows the info window.
 * @param {Array.<number>} coords 2-element array containing latitude and
 *   longitude.
 * @param {google.maps.Marker} marker The marker to anchor the info window to.
 * @param {number} zoomLevel The desired Google Map zoom level.
 * @private
 */
localemaps.www.HomePageManager.prototype.zoomMap_ =
    function(coords, marker, zoomLevel) {
  this.infoWindow_.close();
  var position = new google.maps.LatLng(coords[0], coords[1]);
  this.googleMap_.setZoom(zoomLevel);
  this.googleMap_.setCenter(position);
  this.infoWindow_.open(this.googleMap_, marker);
}

goog.exportSymbol('HomePageManager', localemaps.www.HomePageManager);