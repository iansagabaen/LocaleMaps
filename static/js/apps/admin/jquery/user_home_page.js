$.namespace('localemaps.admin');

localemaps.admin.UserHomePage = function(locales, notices) {
  var self = this;
  this.locales_ = new localemaps.model.Locales();
  if (locales && locales.length) {
    for (i = 0; i < locales.length; i++) {
      this.locales_.add(locales[i]['Locale']);
    }
  }
  soy.renderElement(
    $('#locales').get(0),
    localemaps.templates.locales,
    {
      locales: this.locales_.toJSON()
    });
  this.notices_ = new localemaps.model.Notices();
  if (notices && notices.length) {
    for (i = 0; i < notices.length; i++) {
      this.notices_.add(notices[i]['Notice']);
    }
  }
  this.noticesView_ = new localemaps.admin.NoticesView({
    collection: this.notices_,
    el: $('#notices')
  });
  this.noticesView_.render();
};