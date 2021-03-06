/**
 * @fileoverview Defines a HomePage class that manages overall interaction
 *   on the localemaps.com home page.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.www');

/** @define {string} */
var ANALYTICS_CATEGORY_ATTRIBUTE = '';
/** @define {string} */
var ANALYTICS_LABEL_ATTRIBUTE = '';
/** @define {string} */
var BODY = 'body';
/** @define {string} */
var HASH = '#';
/** @define {string} */
var HIDE = 'hide';
/** @define {string} */
var SEARCH_SUCCESS = 'search-success';
/** @define {string} */
var SHOW = 'show';

/**
 * Constructs a HomePage instance, which manages all actions taken on the
 * localemaps.com home page.
 * @param {Object} options An object with the following properties:
 *   <ul>
 *     <li>
 *       <Array.<Object.<Object.<string, string>>>> locales
 *       A list of locale objects
 *     </li>
 *     <li><string> analyticsId Google Analytics ID</li>
 *   </ul>
 * @constructor
 */
localemaps.www.HomePage = function(options) {
  var self = this,
      locales = options.locales;
  /**
   * Collection of @see {localemaps.www.Locale} objects
   * @type {localemaps.www.Locales}
   * @private
   */
  this.locales_ = new localemaps.www.Locales();
  for (var i = 0; i < locales.length; i++) {
    this.locales_.add(locales[i]['Locale']);
  }
  /**
   * Model used to represent search results to be displayed.
   * @type {localemaps.www.SearchResults}
   * @private
   */
  this.searchResults_ = new localemaps.www.SearchResults();

  /**
   * Wrapper around the #search-results element.
   * @type {localemaps.www.SearchResultsView}
   * @private
   */
  this.searchResultsView_ = new localemaps.www.SearchResultsView({
    el: $('#search-results'),
    model: this.searchResults_
  });

  // Set up event handling around the search form, then get the user's location
  // and initialize the MapView.
  /**
   * Wrapper around the #search-form element.
   * @type {localemaps.www.SearchFormView}
   * @private
   */
  this.searchFormView_ = new localemaps.www.SearchFormView({
    el: $('#search-form'),
    model: this.searchResults_
  });
  this.getLocation_(this.initializeMap_);

  /**
   * Google Analytics ID
   * @type {string}
   * @private
   */
  this.analyticsId_ = options.analyticsId;

  // Initialize Facebook iframe and disclaimer, and footer event tracking.
  $('#fb-iframe').attr(
    'src',
    'http://www.facebook.com/plugins/like.php?href=localemaps.com&amp;layout=standard&amp;show_faces=false&amp;action=like&amp;colorscheme=light');
  $(window).on(
    'resize',
    function(e) {
      self.handleResize_(e);
    });
  $('#show-disclaimer').on(
    localemaps.event.CLICK,
    function(e) {
      e.preventDefault();
      self.toggleDisclaimer_(true);
    });
  this.initializeEventTracking_();
};

/**
 * Height of the header + footer, in pixels.
 * @const
 * @type {number}
 */
localemaps.www.HomePage.HEADER_FOOTER_HEIGHT = 99;

/**
 * The coordinates of the geographic center of the United States (near
 * Lebanon, Kansas).
 * @const
 * @type {Array.<number>}
 * @private
 */
localemaps.www.HomePage.UNITED_STATES_CENTER_ = [39.5, 98.35];

/**
 * Center's the disclaimer within the browser viewport.
 * @private
 */
localemaps.www.HomePage.prototype.centerDisclaimer_ = function() {
  // If the disclaimer is shown, set the top and left to be a function
  // of the body height/width, and disclaimer height/width.
  if (this.disclaimer_ && this.disclaimer_.hasClass(SHOW)) {
    var body = $(BODY);
    var bodyHeight = body.height();
    var bodyWidth = body.width();
    var disclaimerTop = parseInt((body.height() / 2) -
                                 (this.disclaimer_.height() / 2));
    var disclaimerLeft = parseInt((body.width() / 2) -
                                  (this.disclaimer_.width() / 2));
    this.disclaimer_.offset({
      left: disclaimerLeft,
      top: disclaimerTop
    });
  }
};

/**
 * Gets a user's location as a 2-element array, corresponding to latitude and
 * longitude, respectively.
 * @param {function(this:localemaps.www.HomePage,Array.<number>)} callback The
 *   function to execute one the user's location is determined.
 * @private
 */
localemaps.www.HomePage.prototype.getLocation_ = function(callback) {
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
  } else if (window.geoip_latitude && window.geoip_longitude) {
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
          callback.call(self,
                        localemaps.www.HomePage.UNITED_STATES_CENTER_);
        });
  } else {
    callback.call(this, localemaps.www.HomePage.UNITED_STATES_CENTER_);
  }
};

/**
 * Handler called when the window object fires a resize event.
 * @private
 */
localemaps.www.HomePage.prototype.handleResize_ = function() {
  this.centerDisclaimer_();
};

/**
 * Initializes Google Analytics event tracking.
 * @private
 */
localemaps.www.HomePage.prototype.initializeEventTracking_ = function() {
  var self = this;
  $('footer.main nav a').on(
    localemaps.event.CLICK,
    function(e) {
      // If clicking on a link with '#' as the href, push a track event onto
      // the Google Analytics queue.  For other cases, get the explicit page
      // tracker, and fire an event
      var target = $(e.target),
          categoryElt = target.closest('footer[' + ANALYTICS_CATEGORY_ATTRIBUTE + ']');
      if (categoryElt) {
        e.preventDefault();
        var label = target.attr(ANALYTICS_LABEL_ATTRIBUTE),
            href = target.attr('href'),
            asyncCall = (href === HASH);
        localemaps.analytics.trackEvent({
          category: categoryElt.attr(ANALYTICS_CATEGORY_ATTRIBUTE),
          action: localemaps.event.CLICK,
          label: target.attr(ANALYTICS_LABEL_ATTRIBUTE),
          async: asyncCall
        });
        if (!asyncCall) {
          window.location = href;
        }
      }
    });
};

/**
 * Initializes the Google Map displaying locales.
 * @param {Array.<number>} center 2-element array of the coordinates
 *   where the map should be initially centered.
 * @private
 */
localemaps.www.HomePage.prototype.initializeMap_ = function(center) {
  var self = this;
  this.mapView_ = new localemaps.www.MapView({
    center: center,
    collection: this.locales_,
    el: $('#map')
  });
  this.mapView_.render();

  // Bind the MapView to events fired by the SearchResultsView, (ex. hide,
  // show, zoom, etc.).
  this.searchResultsView_.bind(
    localemaps.event.HIDE,
    function() {
      self.mapView_.contract();
    });
  this.searchResultsView_.bind(
    localemaps.event.SHOW,
    function() {
      self.mapView_.expand();
    });
  this.searchFormView_.bind(
    localemaps.event.SEARCH_SUCCESS,
    function(data) {
      if (data.results) {
        var results = data.results;
        for (var i = 0; i < results.length; ++i) {
          var result = results[i];
          var locale = self.locales_.get(parseInt(result.id));
          locale.set(result);
        }
      }
      self.searchResults_.clear({ silent: true });
      self.searchResults_.set(data);
    });
  this.searchFormView_.bind(
    localemaps.event.CLICK_TRACKING,
    function(data) {
      localemaps.analytics.trackEvent(data);
    });
  this.searchResultsView_.bind(
    localemaps.event.ZOOM,
    function(data) {
      self.mapView_.zoomToLocale(data.id);
    });
  this.searchResultsView_.bind(
    localemaps.event.GEOCODE,
    function(result) {
      self.mapView_.zoomToLatLng(result);
    });
  this.searchResultsView_.bind(
    localemaps.event.CLICK_TRACKING,
    function(data) {
      localemaps.analytics.trackEvent(data);
    });
  this.mapView_.bind(
    localemaps.event.BOUNDS_CHANGED,
    function(bounds) {
      self.searchResultsView_.setSearchBoundsBias(bounds);
    });
  this.mapView_.bind(
    localemaps.event.CLICK_TRACKING,
    function(data) {
      localemaps.analytics.trackEvent(data);
    });
};

/**
 * Displays/hides the disclaimer
 * @param {boolean} show Specify true to show the disclaimer and false to
 *   hide it.
 * @private
 */
localemaps.www.HomePage.prototype.toggleDisclaimer_ = function(show) {
  if (!this.disclaimer_ && !this.mask_) {
    // Lazy load the Disclaimer dialog and mask.
    var self = this;
    var hideDisclaimer = function(e) {
      e.preventDefault();
      self.toggleDisclaimer_(false);
    };
    /**
     * DOM element representing the disclaimer content.
     * @type {Element}
     * @private
     */
    this.disclaimer_ = $('#disclaimer');
    /**
     * DOM element representing a semi-transparent mask layered below the
     * Disclaimer dialog.
     * @type {Element}
     * @private
     */
    this.mask_ = $('#mask');
    this.mask_.on(localemaps.event.CLICK, hideDisclaimer);
    $('#disclaimer .close').on(localemaps.event.CLICK, hideDisclaimer);
  }
  if (show) {
    this.mask_.removeClass(HIDE).addClass(SHOW);
    this.disclaimer_.removeClass(HIDE).addClass(SHOW);
    this.centerDisclaimer_();
  } else {
    this.mask_.removeClass(SHOW).addClass(HIDE);
    this.disclaimer_.removeClass(SHOW).addClass(HIDE);
  }
};

window.HomePage = localemaps.www.HomePage;