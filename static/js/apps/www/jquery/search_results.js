/**
 * @fileoverview Defines a SearchResults Backbone model representing search
 *   results displayed in the localemaps.com home page.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.www');

/** @define {number} */
var ALL_DAY_FILTERS = 127;
/** @define {number} */
var ALL_TIME_FILTERS = 3;

/**
 * Construts a SearchResults model, containing the following attributes:
 * <ul>
 *   <li>query {string}</li>
 *   <li>results {Object} JSON version of @see {localemaps.www.Locale}</li>
 * </ul>
 * @constructor
 * @extends {Backbone.Model}
 */
localemaps.www.SearchResults = Backbone.Model.extend({
  url: function() {
    var url = ['/search?q=', encodeURIComponent(this.get('query'))],
        filters = this.get('filters'),
        filterValues = {};
    for (var filterType in filters) {
      var filtersByType = filters[filterType];
      var filterValue = 0;
      for (var i = 0; i < filtersByType.length; i++) {
        var filter = filtersByType[i];
        if (filter.enabled) {
          filterValue += filter.value;
        }
      }
      filterValues[filterType] = filterValue;
    }
    if ((filterValues.day_of_week > -1) &&
        (filterValues.day_of_week < ALL_DAY_FILTERS)) {
      url.push('&d=' + filterValues.day_of_week);
    }
    if ((filterValues.time > -1) &&
        (filterValues.time < ALL_TIME_FILTERS)) {
      url.push('&t=' + filterValues.time);
    }
    return url.join('');
  }
});