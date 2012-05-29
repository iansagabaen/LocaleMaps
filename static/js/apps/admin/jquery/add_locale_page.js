/**
 * @fileoverview Defines an AddLocalePage class that manages the UI for
 *   adding a locale on the localemaps.com admin site.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.admin');

/**
 * Constructs an AddLocalePage instance, manages the UI for
 *   adding a locale on the localemaps.com admin site.
 * @param {List.<Object>} countries An object with the following properties:
 * @constructor
 */
localemaps.admin.AddLocalePage = function(countries) {
  /**
   * Wrapper around the #locale-form-container element
   * @type {localemaps.admin.LocaleFormView}
   * @private
   */
  this.localeFormView_ = new localemaps.admin.LocaleFormView({
    actionUrl: '/locales/create',
    countries: countries,
    el: $('#locale-form-container')
  });
  this.localeFormView_.render();
};
