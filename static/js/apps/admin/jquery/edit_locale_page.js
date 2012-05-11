$.namespace('localemaps.admin');

var ACTIVE = 'active';
var HIDE = 'hide';
var SHOW = 'show';

localemaps.admin.EditLocalePage = function(
  locale, services, countries, daysOfWeek, languages, message) {
  var self = this,
      tabs = $('#edit-locale-tabs'),
      i;
  tabs.tab('show');
  tabs.find('li:nth-child(1)').addClass(ACTIVE);
  $('.tab-content div:nth-child(1)').addClass(ACTIVE);
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
    daysOfWeek: daysOfWeek,
    el: $('#services-container'),
    languages: languages,
    localeId: locale.localeid,
    collection: this.services_
  });
  this.servicesView_.render();
  $('.add-service').click(function(e) {
    self.addServiceRow_(e);
  });
};

localemaps.admin.EditLocalePage.prototype.addServiceRow_ = function(e) {
  e.preventDefault();
  this.servicesView_.addServiceRow();
};

localemaps.admin.EditLocalePage.prototype.handleUpdateLocaleSuccess_ = function(response) {
  if (response.data && response.data.name) {
    var localeNameNode = $('h1 .locale-name');
    localeNameNode.html(response.data && response.data.name);
  }
};
