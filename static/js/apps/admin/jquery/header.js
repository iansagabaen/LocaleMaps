/**
 * @fileoverview Defines an Header class that manages the header
 *   on the localemaps.com admin site.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.admin');

/**
 * Constructs a Header instance that manages the header
 *   on the localemaps.com admin site.
 * @constructor
 */
localemaps.admin.Header = function() {
  $('.dropdown-toggle').dropdown();
};

$(document).ready(function() {
  new localemaps.admin.Header();
});