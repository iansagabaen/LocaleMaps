/**
 * @fileoverview Defines an UserHomePage class that manages the home page for
 *   the localemaps.com admin site, after logging in.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.admin');

/**
 * Constructs a UserHomePage instance that manages the home page for
 *   the localemaps.com admin site, after logging in. See
 *   /web/admin/Controller/HomeController.php - index() for how the
 *   parameters are formatted.
 * @param {Array.<Object>} recentLocales List of recently updated locales
 * @param {Array.<Object>} oldLocales List of most stale locales (ie. haven't
 *   been updated in the longest amount of time)
 * @param {Array.<Object>} notices List of notices whose end is near.
 * @constructor
 */
localemaps.admin.UserHomePage = function(recentLocales, oldLocales, notices) {
  var self = this,
      locale;
  this.recentLocales_ = new localemaps.model.Locales();
  if (recentLocales && recentLocales.length) {
    for (i = 0; i < recentLocales.length; i++) {
      locale = recentLocales[i];
      locale['Locale']['country'] = locale['Country'];
      this.recentLocales_.add(locale['Locale']);
    }
  }
  soy.renderElement(
    $('#recent-locales').get(0),
    localemaps.templates.locales,
    {
      locales: this.recentLocales_.toJSON()
    });
  this.oldLocales_ = new localemaps.model.Locales();
  if (oldLocales && oldLocales.length) {
    for (i = 0; i < oldLocales.length; i++) {
      locale = oldLocales[i];
      locale['Locale']['country'] = locale['Country'];
      this.oldLocales_.add(locale['Locale']);
    }
  }
  soy.renderElement(
    $('#old-locales').get(0),
    localemaps.templates.locales,
    {
      locales: this.oldLocales_.toJSON()
    });
  this.notices_ = new localemaps.model.Notices();
  if (notices && notices.length) {
    for (i = 0; i < notices.length; i++) {
      this.notices_.add(notices[i]['Notice']);
    }
  }
  this.noticesView_ = new localemaps.admin.NoticesView({
    collection: this.notices_,
    el: $('#notices'),
    inlineEdit: false
  });
  this.noticesView_.render();
};