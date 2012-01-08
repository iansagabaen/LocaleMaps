/**
 * @fileoverview Defines a wrapper class around Google Analytics (ie.
 *    functionality provided by ga.js)
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

(function() {
$.namespace('localemaps.analytics');

/** @define {string} */
var analyticsId = '@ANALYTICS_ID@';
/** @define {Object} */
var pageTracker;

/**
 * @param {Object} data An object with the following properties:
 *   <ul>
 *     <li>category {string}</li>
 *     <li>action {string}</li>
 *     <li>label {string}</li>
 *     <li>async {boolean?}</li>
 *   </ul>
 */
localemaps.analytics.trackEvent = function(data) {
  if (data.async) {
    _gaq.push([
      '_trackEvent',
      data.category,
      data.action,
      data.label]);
  } else {
    if (typeof pageTracker === 'undefined') {
      pageTracker = _gat._getTracker(analyticsId);
    }
    pageTracker._trackEvent(data.category, data.action, data.label);
  }
};
})();