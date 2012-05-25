$.namespace('localemaps.admin');

var ACTIVE = 'active';
var HIDE = 'hide';
var SHOW = 'show';
var TABS = {
  'location': 1,
  'services': 2,
  'notices': 3
};

localemaps.admin.EditLocalePage = function(
  locale, services, notices, countries, daysOfWeek, languages, message) {
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
    model: this.locale_
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

localemaps.admin.EditLocalePage.prototype.addNoticeRow_ = function(e) {
  e.preventDefault();
  this.noticesView_.addRow();
};

localemaps.admin.EditLocalePage.prototype.addServiceRow_ = function(e) {
  e.preventDefault();
  this.servicesView_.addRow();
};

localemaps.admin.EditLocalePage.prototype.handleUpdateLocaleSuccess_ = function(response) {
  if (response.data && response.data.name) {
    var localeNameNode = $('h1 .locale-name');
    localeNameNode.html(response.data && response.data.name);
  }
};
