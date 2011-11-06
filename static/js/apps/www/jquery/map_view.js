if (!localemaps) { localemaps = {}; }
if (!localemaps.www) { localemaps.www = {}; }

var BODY = 'body';
var CLICK = 'click';
var DEFAULT_ZOOM_LEVEL = 15;
var ID = 'id';
var IS_COMPLETE = 'isComplete';
var LATITUDE = 'latitude';
var LONGITUDE = 'longitude';
var WITH_SEARCH_RESULTS = 'with-search-results';
var WITHOUT_SEARCH_RESULTS = 'without-search-results';
var ZOOM = 'zoom';

localemaps.www.MapView = Backbone.View.extend({
  events: {
    'click .zoom': 'handleMapClick_'
  },
  handleHideSearchResults: function() {
    this.el.removeClass(WITH_SEARCH_RESULTS).addClass(WITHOUT_SEARCH_RESULTS);
  },
  handleShowSearchResults: function() {
    this.el.removeClass(WITHOUT_SEARCH_RESULTS).addClass(WITH_SEARCH_RESULTS);
  },
  initialize: function(options) {
    var self = this;
    this.markers_ = {};
    this.map_ = new google.maps.Map(
      this.el.get(0),
      {
        center: new google.maps.LatLng(options.center[0], options.center[1]),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 8
      });
    this.infoWindow_ = new google.maps.InfoWindow({
      content: '',
      maxWidth: 350
    });
    $(window).on(
      'resize',
      function(e) {
        self.resize(e);
      });
  },
  render: function() {
    this.collection.each(function(locale) {
      var latitude = locale.get(LATITUDE),
          longitude = locale.get(LONGITUDE);
      if (latitude && longitude) {
        this.renderMarker(locale.get(ID),
                          new google.maps.LatLng(latitude, longitude));
      }
    }, this);
    this.resize();
    return this;
  },
  renderMarker: function(localeId, latLng) {
    var marker = new google.maps.Marker({
      map: this.map_,
      position: latLng
    });
    marker.localeId = parseInt(localeId);
    this.markers_[localeId] = marker;
    this.bindMarker_(marker);
  },
  resize: function() {
    var contentHeight = $(BODY).height() -
                        localemaps.www.HomePage.HEADER_FOOTER_HEIGHT;
    if (contentHeight) {
      this.el.height(contentHeight);
    }
  },
  zoomToLocale: function(coords, id) {
    var self = this;
    var locale = this.collection.get(id);
    this.infoWindow_.close();
    this.infoWindow_.setContent(localemaps.templates.locale(locale.toJSON()));
    this.zoomMap_(coords, id);
    /*
    var self = this;
    var locale = self.collection.get(marker.localeId);
    var successHandler = function(localeObj) {
      this.infoWindow_.setContent(localemaps.templates.locale(localeObj));
      this.zoomMap_(coords, id);
    };
    if (locale.get(IS_COMPLETE)) {
      successHandler.call(self, locale.toJSON());
    } else {
      locale.fetch({
        success: function(collection, response) {
          successHandler.call(self, response);
        }
      });
    }
    */
  },
  bindMarker_: function(marker) {
    var self = this;
    var successHandler = function(localeObj) {
      this.infoWindow_.setContent(localemaps.templates.locale(localeObj));
      this.infoWindow_.open(this.map_, marker);
    };
    google.maps.event.addListener(
      marker,
      CLICK,
      function(e) {
        var locale = self.collection.get(marker.localeId);
        if (locale.get(IS_COMPLETE)) {
          successHandler.call(self, locale.toJSON());
        } else {
          locale.fetch({
            success: function(collection, response) {
              successHandler.call(self, response);
            }
          });
        }
      });
  },
  handleMapClick_: function(e) {
    var target = $(e.target);
    if (target.hasClass(ZOOM)) {
      e.preventDefault();
      var coords = target.attr('data-lm-coords').split(',');
      coords[0] = parseFloat(coords[0]);
      coords[1] = parseFloat(coords[1]);
      this.infoWindow_.close();
      var id = parseInt(target.attr('data-lm-id'));
      this.zoomMap_(coords, id);
    }
  },
  zoomMap_: function(coords, id) {
    var position = new google.maps.LatLng(coords[0], coords[1]);
    this.map_.setZoom(DEFAULT_ZOOM_LEVEL);
    this.map_.setCenter(position);
    this.infoWindow_.open(this.map_, this.markers_[id]);
  }
});