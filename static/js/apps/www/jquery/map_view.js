/**
 * @fileoverview Defines a MapView Backbone view that wraps around the Google
 *   Maps instance used in the localemaps.com home page.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.www');

/** @define {string} */
var BODY = 'body';
/** @define {string} */
var CLICK = 'click';
/** @define {number} */
var DEFAULT_ZOOM_LEVEL = 5;
/** @define {number} */
var FULL_ZOOM_IN_LEVEL = 15;
/** @define {string} */
var ID = 'id';
/** @define {string} */
var IS_COMPLETE = 'isComplete';
/** @define {string} */
var LATITUDE = 'latitude';
/** @define {string} */
var LONGITUDE = 'longitude';
/** @define {string} */
var WITH_SEARCH_RESULTS = 'with-search-results';
/** @define {string} */
var WITHOUT_SEARCH_RESULTS = 'without-search-results';
/** @define {string} */
var ZOOM = 'zoom';

/**
 * Wrapper around a Google Maps instance, which manages display of markers
 * and event handling.
 * @constructor
 * @extends {Backbone.View}
 */
localemaps.www.MapView = Backbone.View.extend({
  events: {
    'click .zoom': 'handleMapClick_'
  },
  /**
   * Shrinks the map view (width only).  This is done with respect to whether
   * search results are shown.
   */
  contract: function() {
    this.el.removeClass(WITH_SEARCH_RESULTS).addClass(WITHOUT_SEARCH_RESULTS);
  },
  /**
   * Expands the map view (width only).  This is done with respect to whether
   * search results are hidde.
   */
  expand: function() {
    this.el.removeClass(WITHOUT_SEARCH_RESULTS).addClass(WITH_SEARCH_RESULTS);
  },
  /**
   * Initializes the view.
   * @param {Object.<string, object>} options An object where 'center' is set to
   *   to a 2-element array with latitude and longitude as the elements,
   *   respectively.
   * @override
   */
  initialize: function(options) {
    // Create the Google Maps instance, InfoWindow and listen to the window
    // resize event.
    var self = this;
    /**
     * Hash map of locale ID to @see {google.maps.Marker} objects.
     * @type {Array.<google.maps.Marker>}
     * @private
     */
    this.markers_ = {};
    /**
     * Google Maps instance.
     * @type {google.maps.Map}
     * @private
     */
    this.map_ = new google.maps.Map(
      this.el.get(0),
      {
        center: new google.maps.LatLng(options.center[0], options.center[1]),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 8
      });
    /**
     * Google Maps InfoWindow instance.
     * @type {google.maps.InfoWindow}
     * @private
     */
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
  /**
   * Renders the view.
   * @return {localemaps.www.MapView}
   * @override
   */
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
  /**
   * Creates a Google Maps marker, and associates it to the given locale ID.
   * @param {number} localeId The associated locale ID.
   * @param {Array.<number>} 2-element array corresponding to
   *   latitude/longitude
   */
  renderMarker: function(localeId, latLng) {
    var marker = new google.maps.Marker({
      map: this.map_,
      position: latLng
    });
    marker.localeId = parseInt(localeId);
    this.markers_[localeId] = marker;
    this.bindMarker_(marker);
  },
  /**
   * Resizes the height of the MapView instance.
   */
  resize: function() {
    var contentHeight = $(BODY).height() -
                        localemaps.www.HomePage.HEADER_FOOTER_HEIGHT;
    if (contentHeight) {
      this.el.height(contentHeight);
    }
  },
  /**
   * Zooms the map to given latitude/longitude.
   * @param {google.maps.GeocoderResults} latLng Latitude/longitude
   */
  zoomToLatLng: function(result) {
    // this.map_.setZoom(DEFAULT_ZOOM_LEVEL);
    if (result.geometry) {
      if (result.geometry.viewport) {
        this.map_.panToBounds(result.geometry.viewport);
      } else if (result.geometry.bounds) {
        this.map_.panToBounds(result.geometry.bounds);
      }
      this.map_.setZoom(DEFAULT_ZOOM_LEVEL);
      this.map_.setCenter(result.geometry.location);
    }
  },
  /**
   * Zooms the map to the specified locale.
   * @param {number} id ID of the locale to zoom in
   */
  zoomToLocale: function(id) {
    var self = this;
    var locale = this.collection.get(id);
    this.infoWindow_.close();
    this.infoWindow_.setContent(localemaps.templates.locale(locale.toJSON()));
    this.zoomMap_(
      [
        locale.get('latitude'),
        locale.get('longitude')
      ],
      id);
  },
  /**
   * Sets up event handling on the specified marker, representing a locale.
   * @param {google.maps.Marker} marker
   * @private
   */
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
  /**
   * Handles clicks on the MapView.
   * @param {Object} e Event object
   * @private
   */
  handleMapClick_: function(e) {
    var target = $(e.target);
    if (target.hasClass(ZOOM)) {
      e.preventDefault();
      this.infoWindow_.close();
      var id = parseInt(target.attr('data-lm-id'));
      var locale = this.collection.get(id);
      this.zoomMap_(
        [
          locale.get('latitude'),
          locale.get('longitude')
        ],
        id);
    }
  },
  /**
   * Zooms map on the specified coordinates and locale.
   * @param {Array.<number>} coords 2-element array containing latitude and
   *   longitude, respectively.
   * @param {number} id ID of the locale to zoom in on.
   */
  zoomMap_: function(coords, id) {
    this.map_.setZoom(FULL_ZOOM_IN_LEVEL);
    var position = new google.maps.LatLng(coords[0], coords[1]);
    this.map_.setCenter(position);
    this.infoWindow_.open(this.map_, this.markers_[id]);
  }
});