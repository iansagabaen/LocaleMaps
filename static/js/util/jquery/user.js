$.namespace('localemaps.model');

localemaps.model.User = Backbone.Model.extend({
});

localemaps.model.Users = Backbone.Collection.extend({
  model: localemaps.model.User,
  url: '/users'
});