$.namespace('localemaps.admin');

// TODO(rcruz):
// - Deleting service - confirmation of deletion
// - Handle validation errors via modal

var ACTIVE = 'active';
var HIDE = 'hide';
var SHOW = 'show';

localemaps.admin.EditLocalePage = function(
  localeId, services, daysOfWeek, languages) {
  var self = this,
      tabs = $('#edit-locale-tabs'),
      i;
  tabs.tab('show');
  tabs.find('li:nth-child(1)').addClass(ACTIVE);
  $('.tab-content div:nth-child(1)').addClass(ACTIVE);
  this.localeFormView_ = new localemaps.admin.LocaleFormView({
    el: $('#locale-form')
  });
  this.localeFormView_.bind(
    localemaps.event.UPDATE_LOCALE_SUCCESS,
    function(response) {
      self.handleUpdateLocaleSuccess_(response);
    });

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
    localeId: localeId,
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
