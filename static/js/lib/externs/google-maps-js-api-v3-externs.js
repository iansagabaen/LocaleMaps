/**
 * Externs file for Google Maps v3 API, taken from http://goo.gl/FXb2i
 */
google.maps = { };

/** @constructor */
google.maps.MVCObject = function() { };
/**
* @param {string} key
* @param {google.maps.MVCObject} target
* @param {string} targetKey
* @param {?boolean} noNotify
*/
google.maps.MVCObject.prototype.bindTo = function(key, target, targetKey, noNotify) { };
/** @param {string} key */
google.maps.MVCObject.prototype.changed = function(key) { };
/**
* @nosideeffects
* @param {string} key
* @returns {*}
*/
google.maps.MVCObject.prototype.get = function(key) { };
/**
* @param {string} key
* @param {*} value
*/
google.maps.MVCObject.prototype.set = function(key, value) { };
/** @param {?Array.<*>} Array */
google.maps.MVCObject.prototype.setValues = function(Array) { };
/** @param {string} key */
google.maps.MVCObject.prototype.unbind = function(key) { };
google.maps.MVCObject.prototype.unbindAll = function() { };

/**
* @constructor
* @extends {google.maps.MVCObject}
*/
google.maps.MVCArray = function() { };
/** @param {function(*, number)} callback */
google.maps.MVCArray.prototype.forEach = function(callback) { };
/**
* @nosideeffects
* @param {number} i
* @returns {*}
*/
google.maps.MVCArray.prototype.getAt = function(i) { };
/**
* @nosideeffects
* @returns {number}
*/
google.maps.MVCArray.prototype.getLength = function() { };
/**
* @param {number} i
* @param {*} elem
*/
google.maps.MVCArray.prototype.insertAt = function(i, elem) { };
/** @returns {*} */
google.maps.MVCArray.prototype.pop = function() { };
/** @param {*} elem */
google.maps.MVCArray.prototype.push = function(elem) { };
/** @param {number} i */
google.maps.MVCArray.prototype.removeAt = function(i) { };
/**
* @param {number} i
* @param {*} elem
*/
google.maps.MVCArray.prototype.setAt = function(i, elem) { };

/** @constructor */
google.maps.MapPanes = {};
google.maps.MapPanes.floatPane = document.createNode("div");
google.maps.MapPanes.floatShadow = document.createNode("div");
google.maps.MapPanes.mapPane = document.createNode("div");
google.maps.MapPanes.overlayImage = document.createNode("div");
google.maps.MapPanes.overlayLayer = document.createNode("div");
google.maps.MapPanes.ovelrayMouseTarget = document.createNode("div");
google.maps.MapPanes.overlayShadow = document.createNode("div");

/**
* @constructor
* @extends {google.maps.MVCObject}
*/
google.maps.OverlayView = function() { }
google.maps.OverlayView.prototype.draw = function() { }
/**
* @nosideeffects
* @returns {google.maps.Map}
*/
google.maps.OverlayView.prototype.getMap = function() { }
/**
* @nosideeffects
* @returns {google.maps.MapPanes}
*/
google.maps.OverlayView.prototype.getPanes = function() {}
/**
* @nosideeffects
* @returns {google.maps.MapCanvasProjection}
*/
google.maps.OverlayView.prototype.getProjection = function() { }
google.maps.OverlayView.prototype.onAdd = function() { }
google.maps.OverlayView.prototype.onRemove = function() { }
/** @param {google.maps.Map} a */
google.maps.OverlayView.prototype.setMap = function(a) {  }

/**
* @constructor
* @param {number} a
* @param {number} b
*/
google.maps.LatLng = function(a, b) { }
/**
* @nosideeffects
* @param {google.maps.LatLng} other
* @returns {boolean}
*/
google.maps.LatLng.prototype.equals = function(other) { }
/**
* @nosideeffects
* @returns {number}
*/
google.maps.LatLng.prototype.lat = function() { }
/**
* @nosideeffects
* @returns {number}
*/
google.maps.LatLng.prototype.lng = function() { }
/**
* @nosideeffects
* @returns {string}
*/
google.maps.LatLng.prototype.toString = function() { }
/**
* @nosideeffects
* @param {?number} precision
* @returns {string}
*/
google.maps.LatLng.prototype.toUrlValue = function(precision) { }
/**
* @constructor
* @param {?google.maps.LatLng} sw
* @param {?google.maps.LatLng} ne
*/
google.maps.LatLngBounds = function(sw, ne) { }
/**
* @nosideeffects
* @param {google.maps.LatLng} LatLng
* @returns {boolean}
*/
google.maps.LatLngBounds.prototype.contains = function(LatLng) { }
/**
* @nosideeffects
* @param {google.maps.LatLngBounds} other
* @returns {boolean}
*/
google.maps.LatLngBounds.prototype.equals = function(other) { }
/**
* @param {google.maps.LatLng} LatLng
* @returns {google.maps.LatLngBounds}
*/
google.maps.LatLngBounds.prototype.extend = function(LatLng) { }
/**
* @nosideeffects
* @returns {google.maps.LatLng}
*/
google.maps.LatLngBounds.prototype.getCenter = function() { }
/**
* @nosideeffects
* @returns {google.maps.LatLng}
*/
google.maps.LatLngBounds.getNorthEast = function() { }
/**
* @nosideeffects
* @returns {google.maps.LatLng}
*/
google.maps.LatLngBounds.getSouthWest = function() { }
/**
* @nosideeffects
* @param {google.maps.LatLngBounds} a
* @returns {boolean}
*/
google.maps.LatLngBounds.intersects = function(a) {}
/**
* @nosideeffects
* @returns {boolean}
*/
google.maps.LatLngBounds.prototype.isEmpty = function() { }
/**
* @nosideeffects
* @returns {google.maps.LatLng}
*/
google.maps.LatLngBounds.prototype.toSpan = function() { }
/**
* @nosideeffects
* @returns {string}
*/
google.maps.LatLngBounds.prototype.toString = function() { }
/**
* @nosideeffects
* @param {?number} precision
* @returns {string}
*/
google.maps.LatLngBounds.prototype.toUrlValue = function(precision) { }
/**
* @param {google.maps.LatLngBounds} other
* @returns {google.maps.LatLngBounds}
*/
google.maps.LatLngBounds.prototype.union = function(other) { }
/**
* @constructor
* @param {number} a
* @param {number} b
*/
google.maps.Point = function(a, b) { }
google.maps.Point.x = 0;
google.maps.Point.y = 0;
/**
* @nosideeffects
* @param {google.maps.Point} other
* @returns {boolean}
*/
google.maps.Point.prototype.equals = function(other) { }
/**
* @nosideeffects
* @returns {string}
*/
google.maps.Point.prototype.toString = function() { }
/**
* @constructor
* @param {number} a
* @param {number} b
*/
google.maps.Size = function(a, b) { }
google.maps.Size.width = 0;
google.maps.Size.height = 0;
/**
* @nosideeffects
* @param {google.maps.Size} other
* @returns {boolean}
*/
google.maps.Size.prototype.equals = function(other) { }
/**
* @nosideeffects
* @returns {string}
*/
google.maps.Size.prototype.toString = function() { }
/**
* @constructor
*/
google.maps.MapsEventListener = function() {}
google.maps.event = {}
/**
* @param {Object} a
* @param {string} b
* @param {function(...[*])} c
* @returns {google.maps.MapsEventListener}
*/
google.maps.event.addDomListener = function(a, b, c) { };
/**
* @param {Object} a
* @param {string} b
* @param {function(?google.maps.MouseEvent)} c
* @returns {google.maps.MapsEventListener}
*/
google.maps.event.addListener = function(a, b, c) { }
/**
* @param {Object} a
*/
google.maps.event.clearInstanceListeners = function(a) { }
/**
* @param {google.maps.MapsEventListener} a
*/
google.maps.event.removeListener = function(a) {}
/**
* @param {Object} a
* @param {string} b
* @param {...[*]} c
*/
google.maps.event.trigger = function(a, b, c) {}

/**
* @interface
*/
google.maps.MapType = function() { }
/**
* @param {google.maps.Point} tileCoord
* @param {number} zoom
* @param {Node} doc
*/
google.maps.MapType.prototype.getTile = function(tileCoord, zoom, doc) { }
/**
* @param {Node} tile
*/
google.maps.MapType.prototype.releaseTile = function(tile) { }
google.maps.MapType.alt = "";
google.maps.MapType.maxZoom = 0;
google.maps.MapType.minZoom = 0;
google.maps.MapType.name = "";
google.maps.MapType.projection = "";
google.maps.MapType.tileSize = new google.maps.Size(0,0);

/**
* @constructor
* @implements {google.maps.MapType}
* @param {Object.<string, *>} a
*/
google.maps.ImageMapType = function(a) { }
/**
* @param {google.maps.Point} tileCoord
* @param {number} zoom
* @param {Node} doc
*/
google.maps.ImageMapType.prototype.getTile = function(tileCoord, zoom, doc) { }
/**
* @param {Node} tile
*/
google.maps.ImageMapType.prototype.releaseTile = function(tile) { }
google.maps.ImageMapType.alt = "";
/**
* @param {google.maps.Point} point
* @param {number} zoom
* @returns {string}
*/
google.maps.ImageMapType.getTileUrl = function(point, zoom) { };
google.maps.ImageMapType.isPng = true;
google.maps.ImageMapType.maxZoom = 0;
google.maps.ImageMapType.minZoom = 0;
google.maps.ImageMapType.name = "";
google.maps.ImageMapType.tileSize = new google.maps.Size(0,0);

/**
* @constructor
* @extends {google.maps.MVCObject}
* @param {Node} a
* @param {?Object.<string, *>} b
*/
google.maps.Map = function(a, b) {}
/**
* @param {google.maps.LatLngBounds} a
*/
google.maps.Map.prototype.fitBounds = function(a) { }
/**
* @nosideeffects
* @returns {google.maps.LatLngBounds}
*/
google.maps.Map.prototype.getBounds = function() { }
/**
* @nosideeffects
* @returns {google.maps.LatLng}
*/
google.maps.Map.prototype.getCenter = function() { }
/**
* @nosideeffects
* @returns {Node}
*/
google.maps.Map.prototype.getDiv = function() { }
/**
* @nosideeffects
* @returns {google.maps.MapTypeId}
*/
google.maps.Map.prototype.getMapTypeId = function() { }
/**
* @nosideeffects
* @returns {number}
*/
google.maps.Map.prototype.getZoom = function() { }
/**
* @param {number} x
* @param {number} y
*/
google.maps.Map.prototype.panBy = function(x, y) { }
/** @param {google.maps.LatLng} LatLng */
google.maps.Map.prototype.panTo = function(LatLng) { }
/** @param {google.maps.LatLngBounds} LatLngBounds */
google.maps.Map.prototype.panToBounds = function(LatLngBounds) { }
/** @param {google.maps.LatLng} a */
google.maps.Map.prototype.setCenter = function(a) { }
/** @param {google.maps.MapTypeId} a */
google.maps.Map.prototype.setMapTypeId = function(a) { }
/** @param {Object.<string,*>} a */
google.maps.Map.prototype.setOptions = function(a) { }
/** @param {number} a */
google.maps.Map.prototype.setZoom = function(a) { }
/** @type {Array.<string>} */
google.maps.mapTypes = [];
/** @type {Array.<*>} */
google.maps.overlayMapTypes = [];

/** @constructor */
google.maps.MapCanvasProjection = function() {};
/**
* @nosideeffects
* @param {google.maps.Point} a
* @returns {google.maps.LatLng}
*/
google.maps.MapCanvasProjection.prototype.fromContainerPixelToLatLng = function(a) { }
/**
* @nosideeffects
* @param {google.maps.Point} a
* @returns {google.maps.LatLng}
*/
google.maps.MapCanvasProjection.prototype.fromDivPixelToLatLng = function(a) { } 
/**
* @nosideeffects
* @param {google.maps.LatLng} a
* @returns {google.maps.Point}
*/
google.maps.MapCanvasProjection.prototype.fromLatLngToContainerPixel = function(a) {}
/**
* @nosideeffects
* @param {google.maps.LatLng} a
* @returns {google.maps.Point}
*/
google.maps.MapCanvasProjection.prototype.fromLatLngToDivPixel = function(a) {}
/**
* @nosideeffects
* @returns {number}
*/
google.maps.MapCanvasProjection.prototype.getWorldWidth = function(a) {}
/**
* @constructor
*/
google.maps.MapTypeId = function() { }
google.maps.MapTypeId.ROADMAP = "";
google.maps.MapTypeId.HYBRID = "";
google.maps.MapTypeControlStyle = {};
google.maps.MapTypeControlStyle.DEFAULT = {};
google.maps.MapTypeControlStyle.DROPDOWN_MENU = {};
google.maps.MapTypeControlStyle.HORIZONTAL_BAR = {};

google.maps.NavigationControlStyle = {};
google.maps.NavigationControlStyle.SMALL = 0;
google.maps.NavigationControlStyle.ANDROID = 0;
google.maps.NavigationControlStyle.DEFAULT = 0;
google.maps.NavigationControlStyle.ZOOM_PAN = 0;

google.maps.ScaleControlStyle = {};
google.maps.ScaleControlStyle.DEFAULT = {};

google.maps.ControlPosition = {};
google.maps.ControlPosition.BOTTOM = {};
google.maps.ControlPosition.BOTTOM_LEFT = {};
google.maps.ControlPosition.BOTTOM_RIGHT = {};
google.maps.ControlPosition.LEFT = {};
google.maps.ControlPosition.RIGHT = {};
google.maps.ControlPosition.TOP = {};
google.maps.ControlPosition.TOP_LEFT = {};
google.maps.ControlPosition.TOP_RIGHT = {};

/**
* @constructor
* @extends {google.maps.MVCObject}
* @param {?Object.<string, *>} a
*/
google.maps.Polyline = function(a) {}
/**
* @nosideeffects
* @returns {google.maps.Map}
*/
google.maps.Polyline.prototype.getMap = function() { }
/**
* @nosideeffects
* @returns {google.maps.MVCArray}
*/
google.maps.Polyline.prototype.getPath = function() {}
/**
* @param {google.maps.Map} a
*/
google.maps.Polyline.prototype.setMap = function(a) {}
/**
* @param {Object.<string, *>} a
*/
google.maps.Polyline.prototype.setOptions = function(a) {}
/**
* @param {(google.maps.MVCArray|Array.<google.maps.LatLng>)} a
*/
google.maps.Polyline.prototype.setPath = function(a) {}

/**
* @constructor
* @extends {google.maps.MVCObject}
* @param {?Object.<string, *>} a
*/
google.maps.Polygon = function(a) { }
/**
* @nosideeffects
* @returns {google.maps.Map}
*/
google.maps.Polygon.prototype.getMap = function() { }
/**
* @returns {google.maps.MVCArray}
*/
google.maps.Polygon.prototype.getPath = function() { }
/**
* @returns {google.maps.MVCArray}
*/
google.maps.Polygon.prototype.getPaths = function() { }
/**
* @param {google.maps.Map} a
*/
google.maps.Polygon.prototype.setMap = function(a) { }
/**
* @param {Object.<string, *>} a
*/
google.maps.Polygon.prototype.setOptions = function(a) { }
/**
* @param {(google.maps.MVCArray|Array.<google.maps.LatLng>)} a
*/
google.maps.Polygon.prototype.setPath = function(a) { }
/**
* @param {(google.maps.MVCArray|Array.<Array.<google.maps.LatLng>>)} a
*/
google.maps.Polygon.prototype.setPaths = function(a) { }

/**
* @constructor
* @extends {google.maps.MVCObject}
* @param {?Object.<string, *>} a
*/
google.maps.Marker = function(a) {}
/**
* @nosideeffects
* @returns {boolean}
*/
google.maps.Marker.prototype.getClickable = function() {}
/**
* @nosideeffects
* @returns {string}
*/
google.maps.Marker.prototype.getCursor = function() {}
/**
* @nosideeffects
* @returns {boolean}
*/
google.maps.Marker.prototype.getDraggable = function() {}
/**
* @nosideeffects
* @returns {boolean}
*/
google.maps.Marker.prototype.getFlat = function() {}
/**
* @nosideeffects
* @returns {(string|Object.<string,*>)}
*/
google.maps.Marker.prototype.getIcon = function() {}
/**
* @nosideeffects
* @returns {google.maps.Map}
*/
google.maps.Marker.prototype.getMap = function() {}
/**
* @nosideeffects
* @returns {google.maps.LatLng}
*/
google.maps.Marker.prototype.getPosition = function() {}
/**
* @nosideeffects
* @returns {(string|Object.<string,*>)}
*/
google.maps.Marker.prototype.getShadow = function() {}
/**
* @nosideeffects
* @returns {Object}
*/
google.maps.Marker.prototype.getShape = function() {}
/**
* @nosideeffects
* @returns {string}
*/
google.maps.Marker.prototype.getTitle = function() {}
/**
* @nosideeffects
* @returns {boolean}
*/
google.maps.Marker.prototype.getVisible = function() {}
/**
* @nosideeffects
* @returns {number}
*/
google.maps.Marker.prototype.getZIndex= function() {}
/** @param {boolean} a */
google.maps.Marker.prototype.setClickable = function(a) {}
/** @param {string} a */
google.maps.Marker.prototype.setCursor = function(a) {}
/** @param {boolean} a */
google.maps.Marker.prototype.setDraggable = function(a) {}
/** @param {boolean} a */
google.maps.Marker.prototype.setFlat = function(a) {}
/** @param {(string|Object.<string,*>)} a */
google.maps.Marker.prototype.setIcon = function(a) {}
/** @param {google.maps.Map} a */
google.maps.Marker.prototype.setMap = function(a) {}
/** @param {Object.<string, *>} a */
google.maps.Marker.prototype.setOptions = function(a) {}
/** @param {google.maps.LatLng} a */
google.maps.Marker.prototype.setPosition = function(a) {}
/** @param {(string|Object.<string,*>)} a */
google.maps.Marker.prototype.setShadow = function(a) {}
/** @param {Object} a */
google.maps.Marker.prototype.setShape = function(a) {}
/** @param {string} a */
google.maps.Marker.prototype.setTitle = function(a) {}
/** @param {boolean} a */
google.maps.Marker.prototype.setVisible = function(a) {}
/** @param {number} a */
google.maps.Marker.prototype.setZIndex= function(a) {}
/**
* @constructor
* @extends {google.maps.MVCObject}
* @param {Object.<string, *>} a
*/
google.maps.InfoWindow = function(a) {}
google.maps.InfoWindow.prototype.close = function() {}
/**
* @nosideeffects
* @returns {(string|Node)}
*/
google.maps.InfoWindow.prototype.getContent = function() {}
/**
* @nosideeffects
* @returns {google.maps.LatLng}
*/
google.maps.InfoWindow.prototype.getPosition = function() {}
/**
* @nosideeffects
* @returns {number}
*/
google.maps.InfoWindow.prototype.getZIndex = function() {}
/**
* @param {google.maps.Map} map
* @param {?google.maps.MVCObject} anchor
*/
google.maps.InfoWindow.prototype.open = function(map, anchor) {}
/** @param {(string|Node)} a */
google.maps.InfoWindow.prototype.setContent = function(a) {}
/** @param {Object.<string, *>} a */
google.maps.InfoWindow.prototype.setOptions = function(a) {}
/** @param {google.maps.LatLng} a */
google.maps.InfoWindow.prototype.setPosition = function(a) {}
/** @param {number} a */
google.maps.InfoWindow.prototype.setZIndex = function(a) {}
/**
* @param {string} a
*/
google.maps.InfoWindow.setContent = function(a) {}
/**
* @constructor
* @param {string} a
* @param {google.maps.Size} b
* @param {google.maps.Point} c
* @param {google.maps.Point=} d
*/
google.maps.MarkerImage = function(a, b, c, d) { }
google.maps.MarkerImage.url = "";
google.maps.MarkerImage.size = new google.maps.Size(0,0);
google.maps.MarkerImage.origin = new google.maps.Point(0,0);
google.maps.MarkerImage.anchor = new google.maps.Point(0,0);

/** @constructor */
google.maps.GeocoderStatus = function() { }
google.maps.GeocoderStatus.ERROR = {};
google.maps.GeocoderStatus.INVALID_REQUEST = {};
google.maps.GeocoderStatus.OK = {};
google.maps.GeocoderStatus.OVER_QUERY_LIMIT = {};
google.maps.GeocoderStatus.REQUEST_DENIED = {};
google.maps.GeocoderStatus.UNKNOWN_ERROR = {};
google.maps.GeocoderStatus.ZERO_RESULTS = {};

/** @constructor */
google.maps.GeocoderLocationType = {};
google.maps.GeocoderLocationType.APPROXIMATE = {};
google.maps.GeocoderLocationType.GEOMETRIC_CENTER = {};
google.maps.GeocoderLocationType.RANGE_INTERPOLATED = {};
google.maps.GeocoderLocationType.ROOFTOP = {};

/** @constructor */
google.maps.GeocoderResponse = function() { }
/** @type {Array.<string>} */
google.maps.GeocoderResponse.types = [];
google.maps.GeocoderResponse.formatted_address = "";
/** @type {Array.<Object.<string, *>>} */
google.maps.GeocoderResponse.address_components = [];
/** @type {Object.<string, *>} */
google.maps.GeocoderResponse.geometry = {};

/** @constructor */
google.maps.Geocoder = function() { }
/**
* @param {Object.<string, *>} req
* @param {function(Array.<Object.<string, *>>, google.maps.GeocoderStatus)} callback
*/
google.maps.Geocoder.prototype.geocode = function(req, callback) { }

/** @constructor */
google.maps.MouseEvent = function() {}
/** @type {google.maps.LatLng} */
google.maps.MouseEvent.latLng = null;

/** @constructor */
google.maps.DirectionsTravelMode = function() { }
/** @const */
google.maps.DirectionsTravelMode.DRIVING = {};
/** @const */
google.maps.DirectionsTravelMode.WALKING = {};

/** @constructor */
google.maps.DirectionsUnitSystem = function() { }
/** @const */
google.maps.DirectionsUnitSystem.IMPERIAL = {};
/** @const */
google.maps.DirectionsUnitSystem.METRIC = {};

/** @constructor */
google.maps.DirectionsStatus = function() { }
/** @const */
google.maps.DirectionsStatus.INVALID_REQUEST = {};
/** @const */
google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED = {};
/** @const */
google.maps.DirectionsStatus.NOT_FOUND = {};
/** @const */
google.maps.DirectionsStatus.OK = {};
/** @const */
google.maps.DirectionsStatus.OVER_QUERY_LIMIT = {};
/** @const */
google.maps.DirectionsStatus.REQUEST_DENIED = {};
/** @const */
google.maps.DirectionsStatus.UNKNOWN_ERROR = {};
/** @const */
google.maps.DirectionsStatus.ZERO_RESULTS = {};

/** @constructor */
google.maps.DirectionsDistance = function() { }
google.maps.DirectionsDistance.text = "";
google.maps.DirectionsDistance.value = 0;

/** @constructor */
google.maps.DirectionsDuration = function() { }
google.maps.DirectionsDuration.text = "";
google.maps.DirectionsDuration.value = 0;

/** @constructor */
google.maps.DirectionsStep = function() { }
/** @type {google.maps.DirectionsDistance} */
google.maps.DirectionsStep.distance = null;
/** @type {google.maps.DirectionsDuration} */
google.maps.DirectionsStep.duration = null;
/** @type {google.maps.LatLng} */
google.maps.DirectionsStep.end_point = null;
google.maps.DirectionsStep.instructions = "";
/** @type {Array.<google.maps.LatLng>} */
google.maps.DirectionsStep.lat_lngs = [];
/** @type {google.maps.LatLng} */
google.maps.DirectionsStep.start_point = null;


/** @constructor */
google.maps.DirectionsRoute = function() { }
/** @type {google.maps.DirectionsDistance} */
google.maps.DirectionsRoute.distance = null;
/** @type {Array.<google.maps.DirectionsDuration>} */
google.maps.DirectionsRoute.duration = [];
/** @type {google.maps.GeocoderResponse} */
google.maps.DirectionsRoute.end_geocode = null;
/** @type {google.maps.GeocoderResponse} */
google.maps.DirectionsRoute.start_geocode = null;
/** @type {Array.<google.maps.DirectionsStep>} */
google.maps.DirectionsRoute.steps = [];

/** @constructor */
google.maps.DirectionsTrip = function() { }
google.maps.DirectionsTrip.copyrights = "";
/** @type {Array.<google.maps.DirectionsRoute>} */
google.maps.DirectionsTrip.routes = [];
/** @type {Array.<string>} */
google.maps.DirectionsTrip.warnings = [];

/** @constructor */
google.maps.DirectionsResult = function() { }
/** @type {Array.<google.maps.DirectionsTrip>} */
google.maps.DirectionsResult.trip = []

/** @constructor */
google.maps.DirectionsService = function() { }
/**
* @param {Object.<string, *>} req
* @param {function(google.maps.DirectionsResult, google.maps.DirectionsStatus)} callback
*/
google.maps.DirectionsRenderer.prototype.route = function(req, callback) { }

/**
* @constructor
* @extends {google.maps.MVCObject}
* @param {Object.<string, *>} opts
*/
google.maps.DirectionsRenderer = function(opts) {}
/**
* @nosideeffects
* @returns {google.maps.Map}
*/
google.maps.DirectionsRenderer.prototype.getMap = function() { }
/**
* @nosideeffects
* @returns {Node}
*/
google.maps.DirectionsRenderer.prototype.getPanel = function() { }
/**
* @nosideeffects
* @returns {number}
*/
google.maps.DirectionsRenderer.prototype.getTripIndex = function() { }
/** @param {google.maps.DirectionsResult} dir */
google.maps.DirectionsRenderer.prototype.setDirections = function(dir) { }
/** @param {google.maps.Map} map */
google.maps.DirectionsRenderer.prototype.setMap = function(map) { }
/** @param {Node} elem */
google.maps.DirectionsRenderer.prototype.setPanel = function(elem) { }
/** @param {number} index */
google.maps.DirectionsRenderer.prototype.setTripIndex = function(index) { }