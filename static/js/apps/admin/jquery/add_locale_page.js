/**
 * @fileoverview Defines an AddLocalePage class that manages the UI for
 *   adding a locale on the localemaps.com admin site.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.admin');

/**
 * Constructs an AddLocalePage instance that manages the UI for
 *   adding a locale on the localemaps.com admin site.
 * @param {Array.<Object>} countries List of countries
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
