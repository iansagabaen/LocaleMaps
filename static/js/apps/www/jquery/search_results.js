/**
 * @fileoverview Defines a SearchResults Backbone model representing search
 *   results displayed in the localemaps.com home page.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

if (!window.localemaps) { window.localemaps = {}; }
if (!localemaps.www) { localemaps.www = {}; }

/**
 * Construts a SearchResults model, containing the following attributes:
 * <ul>
 *   <li>query {string}</li>
 *   <li>results {Object} JSON version of @see {localemaps.www.Locale}</li>
 * </ul>
 * @constructor
 * @extends {Backbone.Model}
 */
localemaps.www.SearchResults = Backbone.Model.extend({});