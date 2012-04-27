$.namespace('localemaps.model');

localemaps.model.Service = Backbone.Model.extend({
});

localemaps.model.Services = Backbone.Collection.extend({
  model: localemaps.model.Service,
  url: '/services'
});