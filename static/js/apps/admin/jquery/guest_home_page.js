/**
 * @fileoverview Defines an GuestHomePage class that manages the UI for
 *   guest home page on the localemaps.com admin site.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.admin');

/**
 * Constructs a GuestHomePage instance that manages the UI for
 *   guest home page on the localemaps.com admin site.
 * @constructor
 */
localemaps.admin.GuestHomePage = function() {
  var alertNode = $('.alert');
  if (alertNode.length) {
    alertNode.alert();
    alertNode.find('.close').on('click', function() {
      alertNode.alert('close');
    });
  }
};