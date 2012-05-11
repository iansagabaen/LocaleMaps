$.namespace('localemaps.admin');

localemaps.admin.AddLocalePage = function(countries) {
  this.localeFormView_ = new localemaps.admin.LocaleFormView({
    actionUrl: '/locales/create',
    countries: countries,
    el: $('#locale-form-container')
  });
  this.localeFormView_.render();
};
