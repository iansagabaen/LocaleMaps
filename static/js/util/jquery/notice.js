$.namespace('localemaps.model');

localemaps.model.Notice = Backbone.Model.extend({
});

localemaps.model.Notices = Backbone.Collection.extend({
  model: localemaps.model.Notice,
  url: '/notices'
});