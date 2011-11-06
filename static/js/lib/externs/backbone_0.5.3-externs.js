/**
 * @fileoverview Externs file for the Backbone.js framework (v0.5.3)
 *   http://documentcloud.github.com/backbone
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

var Backbone = {};

Backbone.Events = {};

/**
 * @param {string} ev
 * @param {function(Object)} callback
 * @param {Object=} context
 */
Backbone.Events.bind = function(ev, callback, context) {};

/**
 * @param {string} ev
 * @param {function(Object)} callback
 */
Backbone.Events.unbind = function(ev, callback) {};

/**
 * @param {string} eventName
 */
Backbone.Events.trigger = function(eventName) {};

/**
 * @param {Object} attributes
 * @param {Object} options
 * @constructor
 */
Backbone.Model = function(attributes, options) {};

Backbone.Model.intialize = function() {};

/**
 * @return {Object}
 */
Backbone.Model.toJSON = function() {};

