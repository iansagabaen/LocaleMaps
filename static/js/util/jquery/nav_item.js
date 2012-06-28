/**
 * @fileoverview Defines Backbone model for nav items used in the global nav
 *   on localemaps.com.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.model');

localemaps.model.NavItem = Backbone.Model.extend({
});

localemaps.model.NavItems = Backbone.Collection.extend({
  model: localemaps.model.NavItem,
  url: '/nav'
});