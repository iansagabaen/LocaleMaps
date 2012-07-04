/**
 * @fileoverview Defines an EditLocalePage class that manages the UI for
 *   editing a locale on the localemaps.com admin site.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.admin');

/** @define {string} */
var ACTIVE = 'active';
/** @define {string} */
var HIDE = 'hide';
/** @define {string} */
var SHOW = 'show';
/** @define {Object} */
var TABS = {
  'location': 1,
  'services': 2,
  'notices': 3
};

/**
 * Constructs an EditLocalePage instance that manages the UI for
 *   adding a locale on the localemaps.com admin site.
 *   To see how the parameters are rendered, see
 *   /web/admin/Controller/LocaleController.php - edit()
 * @param {Object} locale Locale data
 * @param {Array.<Object>} services List of services
 * @param {Array.<Object>} notices List of notices
 * @param {Array.<Object>} navItems List of the global nav items
 * @param {Array.<Object>} countries List of countries
 * @param {Array.<Object>} daysOfWeek List of the days of the week
 * @param {Array.<Object>} languages List of languages
 * @param {string?} message An optional success alert message to display on
     initial load.
 * @constructor
 */
localemaps.admin.EditLocalePage = function(
  locale, services, notices, navItems, countries, daysOfWeek, languages, message) {
  var self = this,
      tabs = $('#edit-locale-tabs'),
      i,
      tabIndex;
  tabs.tab('show');
  tabIndex = TABS[window.location.hash.replace('#', '')] || TABS['location'];
  tabs.find('li:nth-child(' + tabIndex + ')').addClass(ACTIVE);
  $('.tab-content div:nth-child(' + tabIndex + ')').addClass(ACTIVE);
  this.locale_ = new localemaps.model.Locale();
  this.locale_.set(locale);
  this.localeFormView_ = new localemaps.admin.LocaleFormView({
    actionUrl: '/locales/update/' + locale.localeid,
    countries: countries,
    el: $('#location'),
    message: message,
    model: this.locale_,
    navItems: navItems
  });
  this.localeFormView_.bind(
    localemaps.event.UPDATE_LOCALE_SUCCESS,
    function(response) {
      self.handleUpdateLocaleSuccess_(response);
    });
  this.localeFormView_.render();

  // Initialize services view
  this.services_ = new localemaps.model.Services();
  if (services && services.length) {
    for (i = 0; i < services.length; i++) {
      this.services_.add(services[i]['Event']);
    }
  }
  this.servicesView_ = new localemaps.admin.ServicesView({
    collection: this.services_,
    daysOfWeek: daysOfWeek,
    el: $('#services-container'),
    languages: languages,
    localeId: locale.localeid
  });
  this.servicesView_.render();
  $('.add-service').click(function(e) {
    self.addServiceRow_(e);
  });

  this.notices_ = new localemaps.model.Notices();
  if (notices && notices.length) {
    for (i = 0; i < notices.length; i++) {
      this.notices_.add(notices[i]['Notice']);
    }
  }
  this.noticesView_ = new localemaps.admin.NoticesView({
    collection: this.notices_,
    el: $('#notices-container'),
    inlineEdit: true,
    localeId: locale.localeid
  });
  this.noticesView_.render();
  $('.add-notice').click(function(e) {
    self.addNoticeRow_(e);
  });
};

/**
 * Adds a row to the Notices table.
 * @param {Object} e Event object
 * @private
 */
localemaps.admin.EditLocalePage.prototype.addNoticeRow_ = function(e) {
  e.preventDefault();
  this.noticesView_.addRow();
};

/**
 * Adds a row to the Services table.
 * @param {Object} e Event object
 * @private
 */
localemaps.admin.EditLocalePage.prototype.addServiceRow_ = function(e) {
  e.preventDefault();
  this.servicesView_.addRow();
};

/**
 * Handles when the async call to update a locale is successful.
 * @param {Object} response Server response
 * @private
 */
localemaps.admin.EditLocalePage.prototype.handleUpdateLocaleSuccess_ = function(response) {
  if (response.data && response.data.name) {
    var localeNameNode = $('h1 .locale-name');
    localeNameNode.html(response.data && response.data.name);
  }
};
