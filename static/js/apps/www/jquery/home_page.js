if (!window.localemaps) { window.localemaps = {}; }
if (!localemaps.www) { localemaps.www = {}; }

var BODY = 'body';
var CLICK = 'click';
var HIDE = 'hide';
var SHOW = 'show';
var ZOOM = 'zoom';

localemaps.www.HomePage = function(locales) {
  var self = this;
  this.locales_ = new localemaps.www.Locales();
  for (var i = 0; i < locales.length; i++) {
    this.locales_.add(locales[i]['Locale']);
  }
  this.searchResults_ = new localemaps.www.SearchResults();
  this.searchResultsView_ = new localemaps.www.SearchResultsView({
    el: $('#search-results'),
    model: this.searchResults_
  });
  var searchForm = $('#search-form');
  if (!('placeholder' in document.createElement('input'))) {
    new localemaps.GhostLabel(searchForm.find('.input'), 'Find a congregation');
  }
  this.getLocation_(this.initializeMap_);
  searchForm.on(
    'submit',
    function(e) {
      self.submitSearch_(e);
    });
    
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

localemaps.www.HomePage.HEADER_FOOTER_HEIGHT = 99;

localemaps.www.HomePage.UNITED_STATES_CENTER_ = [39.5, 98.35];

localemaps.www.HomePage.prototype.centerDisclaimer_ = function() {
  if (this.disclaimer_ && this.disclaimer_.hasClass(SHOW)) {
    // Center the disclaimer within the viewport.
    var body = $(BODY);
    var bodyHeight = body.height();
    var bodyWidth = body.width();
    var disclaimerTop = parseInt((body.height() / 2 ) -
                                 (this.disclaimer_.height() / 2));
    var disclaimerLeft = parseInt((body.width() / 2 ) -
                                  (this.disclaimer_.width() / 2));
    this.disclaimer_.offset({
      left: disclaimerLeft,
      top: disclaimerTop
    });
  }
};

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

localemaps.www.HomePage.prototype.handleResize_ = function(e) {
  this.centerDisclaimer_();
};

localemaps.www.HomePage.prototype.initializeMap_ = function(center) {
  var self = this;
  this.mapView_ = new localemaps.www.MapView({
    center: center,
    collection: this.locales_,
    el: $('#map')
  });
  this.mapView_.render();
  this.searchResultsView_.bind(
    HIDE,
    function() {
      self.mapView_.handleHideSearchResults();
    });
  this.searchResultsView_.bind(
    SHOW,
    function() {
      self.mapView_.handleShowSearchResults();
    });
  this.searchResultsView_.bind(
    ZOOM,
    function(data) {
      self.mapView_.zoomToLocale(data.coords, data.id);
    });
};

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

localemaps.www.HomePage.prototype.toggleDisclaimer_ = function(show) {
  if (!this.disclaimer_ && !this.mask_) {
    var self = this;
    var hideDisclaimer = function(e) {
      e.preventDefault();
      self.toggleDisclaimer_(false);
    }
    this.disclaimer_ = $('#disclaimer');
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