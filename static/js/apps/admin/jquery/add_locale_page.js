$.namespace('localemaps.admin');

localemaps.admin.AddLocalePage = function() {
  this.localeFormView_ = new localemaps.admin.LocaleFormView({
    el: $('#locale-form')
  });
};
