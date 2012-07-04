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
 * @param {Array.<Object>} navItems List of the global nav items
 * @constructor
 */
localemaps.admin.AddLocalePage = function(countries, navItems) {
  /**
   * Wrapper around the #locale-form-container element
   * @type {localemaps.admin.LocaleFormView}
   * @private
   */
  this.localeFormView_ = new localemaps.admin.LocaleFormView({
    actionUrl: '/locales/create',
    countries: countries,
    navItems: navItems,
    el: $('#locale-form-container')
  });
  this.localeFormView_.render();
};
