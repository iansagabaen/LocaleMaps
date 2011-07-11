window.LocaleMaps = {};
var HEADER_FOOTER_HEIGHT = 100,
    HIDE = 'hide',
    LM_DATA_COORDS = 'lm-data-coords',
    LOADING_CONTENT = '<div class="loading"><img src="img/loader.gif"></div>',
    SHOW = 'show',
    UNDEFINED = 'undefined',
    VISIBILITY = 'visibility',
    ZOOM_CLASS = 'zoom';
LocaleMaps.HomePage = function(locales) {
  var body,
      closeSearchResults,
      disclaimer,
      disclaimerShownOnce = false,
      firstSearch = false,
      googleMap,
      locales = locales,
      localeInfo = {},
      localeInfoWindow,
      map,
      mask,
      searchForm,
      searchResults,
      searchResultsContent,
      self = this;
  var addMarkerEventHandling = function(marker) {
    google.maps.event.addListener(
      marker,
      'click',
      function(e) {
        if (typeof localeInfoWindow == 'undefined') {
          localeInfoWindow = new google.maps.InfoWindow({
            content: '',
            maxWidth: 350
          });
        } else {
          if (localeInfo[marker.localeId]) {
            localeInfoWindow.setContent(localeInfo[marker.localeId]);
            localeInfoWindow.open(googleMap, marker);
          } else {
            localeInfoWindow.setContent(LOADING_CONTENT);
            localeInfoWindow.open(googleMap, marker);
            $.ajax({
              context: self,
              success: function(data, textStatus) {
                localeInfo[marker.localeId] = data;
                localeInfoWindow.setContent(data);
                localeInfoWindow.open(googleMap, marker);
              },
              url: '/locales/' + marker.localeId
            });
          }
        }
      });
  };
  var getLocation = function(callback) {
    var unitedStatesCenter = [39.5, 98.35];
    if (google.loader.ClientLocation != null) {
      callback.call(
        self,
        [
          google.loader.ClientLocation.latitude,
          google.loader.ClientLocation.longitude
        ]);
    } else if (window.geoip_latitude && window.geoip_longitude) {
      callback.call(
        self,
        [
          geoip_latitude(),
          geoip_longitude()
        ]);
    } else if (navigator.geolocation) {
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
          callback.call(self, unitedStatesCenter);
        });
    } else {
      callback.call(self, unitedStatesCenter);
    }
  };
  var hideDisclaimer = function(e) {
    e.preventDefault();
    mask.hide();
    disclaimer.hide();
  };
  var initMap = function(center) {
    googleMap = new google.maps.Map(
      map.get(0),
      {
        center: new google.maps.LatLng(center[0], center[1]),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 8  // zoom level
      });
    for (var i = 0; i < locales.length; i++) {
      var locale = locales[i]['Locale'];
      var latLng = new google.maps.LatLng(locale.gla, locale.gln);
      var marker = new google.maps.Marker({
        map: googleMap,
        position: latLng
      });
      marker.localeId = locale.id;
      addMarkerEventHandling(marker);
    }
  };
  var resizeContent = function() {
    var mapHeight = body.height() - HEADER_FOOTER_HEIGHT;
    map.height(mapHeight);
    searchResults.height(map.height());
  };
  var showDisclaimer = function(e) {
    // Cancel the link behavior
    e.preventDefault();
    mask = $('#mask');
    mask.fadeIn(200);
    if (!disclaimerShownOnce) {
      mask.click(hideDisclaimer);
      $('#disclaimer .close').click(hideDisclaimer);
      maskInitialized = true;
    }

    //Set the popup window to center
    var viewportHeight = body.height();
    var viewportWidth = body.width();
    disclaimer = $('#disclaimer');
    disclaimer.css('top', (viewportHeight / 2) - (disclaimer.height() / 2));
    disclaimer.css('left', (viewportWidth / 2) - (disclaimer.width() / 2));
    disclaimer.fadeIn(200);
  };
  var zoomMap = function(coords, level) {
    var position = new google.maps.LatLng(coords[0], coords[1]);
    googleMap.setZoom(level);
    googleMap.setCenter(position);
  };

  // Set the height of the map, then instantiate it.
  body = $('body');
  map = $('#map');
  searchResults = $('#search-results');
  resizeContent();
  $(window).resize(function() {
    resizeContent();
  });
  getLocation(initMap);
  $(document).ready(function() {
    $('#show-disclaimer').click(showDisclaimer);
    map.click(function(e) {
      var doZoomIn = false,
          realTarget,
          target = $(e.target);
      if (target.hasClass(ZOOM_CLASS)) {
        realTarget = target;
        doZoomIn = true;
      }
      if (doZoomIn) {
        var coords = realTarget.attr('data-lm-coords').split(',');
        coords[0] = parseFloat(coords[0]);
        coords[1] = parseFloat(coords[1]);
        zoomMap.call(self, coords, 15);
      }
    });
    searchForm = $('#search-form');
    searchForm.submit(function(e) {
      e.preventDefault();
      $.ajax({
        context: self,
        success: function(data, textStatus) {
          if (typeof searchResultsContent == UNDEFINED) {
            searchResultsContent = searchResults.find('.content');
          }
          if (!firstSearch) {
            searchResults.height(map.height());
            firstSearch = true;
          }
          searchResults.removeClass(HIDE);
          searchResults.addClass(SHOW);
          searchResultsContent.html(data);
          if (typeof closeSearchResults == UNDEFINED) {
            closeSearchResults = searchResults.find('.close');
          }
          closeSearchResults.click(function(e) {
            searchResults.removeClass(SHOW);
            searchResults.addClass(HIDE);
          });
        },
        url: '/search?q=' + $.trim(searchForm.find('.input').val())
      });
    });
    var iframe = $('.fb-like iframe');
    iframe.attr(
      'src',
      'http://www.facebook.com/plugins/like.php?href=localemaps.com&amp;layout=standard&amp;show_faces=false&amp;width=300&amp;action=like&amp;colorscheme=light&amp;height=26');
  });
};
window.HomePageManager = LocaleMaps.HomePage;