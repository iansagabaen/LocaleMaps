if (!window.localemaps) { window.localemaps = {}; }
if (!localemaps.www) { localemaps.www = {}; }

var READ = 'read';

localemaps.www.Locale = Backbone.Model.extend({
  initialize: function(attributes) {
    this.set({
      latitude: attributes.gla,
      longitude: attributes.gln
    });
  },
  parse: function(response) {
    return response;
  }
});

localemaps.www.Locales = Backbone.Collection.extend({
  model: localemaps.www.Locale,
  url: '/locales'
});