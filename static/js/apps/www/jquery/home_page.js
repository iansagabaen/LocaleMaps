/**
 * @fileoverview Defines a HomePage class that manages overall interaction
 *   on the localemaps.com home page.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.www');

/** @define {string} */
var BODY = 'body';
/** @define {string} */
var CLICK = 'click';
/** @define {string} */
var HIDE = 'hide';
/** @define {string} */
var SHOW = 'show';
/** @define {string} */
var ZOOM = 'zoom';

/**
 * Constructs a HomePage instance, which manages all actions taken on the
 * localemaps.com home page.
 * @param {Array.<Object.<Object.<string, string>>>} List of locales
 * @constructor
 */
localemaps.www.HomePage = function(locales) {
  var self = this;
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
   * Wrapper around the search-results element.
   * @type {localemaps.www.SearchResultsView}
   * @private
   */
  this.searchResultsView_ = new localemaps.www.SearchResultsView({
    el: $('#search-results'),
    model: this.searchResults_
  });

  // Set up event handling around the search form (ex. GhostLabel, form
  // submission, etc.).  Then get the user's location.
  var searchForm = $('#search-form');
  if (!('placeholder' in document.createElement('input'))) {
    new localemaps.GhostLabel(searchForm.find('.input'), 'Find a congregation');
  }
  searchForm.on(
    'submit',
    function(e) {
      self.submitSearch_(e);
    });
  this.getLocation_(this.initializeMap_);

  // Initialize Facebook iframe and disclaimer.
  $('#fb-iframe').attr(
    'src',
    'http://www.facebook.com/plugins/like.php?href=localemaps.com&amp;layout=standard&amp;show_faces=false&amp;action=like&amp;colorscheme=light');
  $(window).on(
    'resize',
    function(e) {
      self.handleResize_(e);
    });
  $('#show-disclaimer').on(
    'click',
    function(e) {
      e.preventDefault();
      self.toggleDisclaimer_(true);
    });
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
    HIDE,
    function() {
      self.mapView_.contract();
    });
  this.searchResultsView_.bind(
    SHOW,
    function() {
      self.mapView_.expand();
    });
  this.searchResultsView_.bind(
    ZOOM,
    function(data) {
      self.mapView_.zoomToLocale(data.id);
    });
};

/**
 * Submits a search request, and displays the results.
 * @see {localemaps.www.SearchResultsView}
 * @param {Object} e Event object
 * @private
 */
localemaps.www.HomePage.prototype.submitSearch_ = function(e) {
  e.preventDefault();
  var query = $.trim($('#search-form .input').val());
  if (query) {
    var self = this;
    $.ajax({
      context: self,
      success: function(data, textStatus) {
        if (data.results) {
          var results = data.results;
          for (var i = 0; i < results.length; ++i) {
            var result = results[i];
            var locale = this.locales_.get(parseInt(result.id));
            locale.set(result);
          }
        }
        this.searchResults_.clear({ silent: true });
        this.searchResults_.set(data);
      },
      url: '/search?q=' + encodeURIComponent(query)
    });
  }
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
    }
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
    this.mask_.on(CLICK, hideDisclaimer);
    $('#disclaimer .close').on(CLICK, hideDisclaimer);
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