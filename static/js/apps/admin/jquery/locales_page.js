$.namespace('localemaps.admin');

var DELETE = 'delete';
var HIDE = 'hide';
var SHOW = 'show';

localemaps.admin.LocalesPage = function(locales) {
  var self = this;
  this.isDeleting_ = false;
  this.locales_ = new localemaps.model.Locales();
  if (locales && locales.length) {
    for (i = 0; i < locales.length; i++) {
      this.locales_.add(locales[i]['Locale']);
    }
  }
  soy.renderElement(
    $('#locales-container').get(0),
    localemaps.templates.locales,
    {
      allowDelete: true,
      locales: this.locales_.toJSON(),
      showNoLocalesText: true
    });

  this.initConfirmModal_();
  $('#locales').click(function(e) {
    self.handleLocalesClick_(e);
  });
};

localemaps.admin.LocalesPage.prototype.deleteLocale_ = function(id) {
  var self = this;
  this.isDeleting_ = true;
  $.ajax({
    dataType: 'json',
    error: function(response) {
      self.confirmModalBody_.html('An error occurred.');
      self.confirmModalCancel_.hide();
      self.confirmModalSubmit_.hide();
      self.confirmModal_.modal(SHOW);
    },
    success: function(response) {
      self.handleDeleteLocaleSuccess_();
    },
    type: 'DELETE',
    url: '/locales/delete/' + id
  });
};


localemaps.admin.LocalesPage.prototype.handleDeleteLocaleSuccess_ =
  function() {
  this.confirmModalHeader_.html('Success!');
  this.confirmModalBody_.html([
    'The locale of ',
    this.locale_.name,
    ' is now removed.'
    ].join(''));
  this.confirmModalCancel_.hide();
  this.confirmModalSubmit_.html('Ok');
  this.locale_.tr.remove();
  this.locale_ = null;
  this.isDeleting_ = false;
};

localemaps.admin.LocalesPage.prototype.handleLocalesClick_ = function(e) {
  var message,
      target = $(e.target),
      tr;
  if (target.hasClass(DELETE) || target.parent().hasClass(DELETE)) {
    e.preventDefault();
    tr = target.parents('tr[data-lm-id]');
    this.locale_ = {
      id: tr.attr('data-lm-id'),
      name: tr.find('.locale-name').html(),
      tr: tr
    };
    this.confirmModalHeader_.html('Are you sure?');
    this.confirmModalBody_.html([
      'Are you sure you want to delete the locale of ',
      this.locale_.name,
      '?'].join(''));
    this.confirmModal_.modal(SHOW);
    this.confirmModalCancel_.show();
    this.confirmModalSubmit_.html("I'm sure");
  }
};

localemaps.admin.LocalesPage.prototype.initConfirmModal_ = function() {
  var self = this;
  this.confirmModal_ = $('.confirmation-modal').modal({
    backdrop: true,
    keyboard: true,
    show: false
  });
  this.confirmModalHeader_ = this.confirmModal_.find('.header-message');
  this.confirmModalBody_ = this.confirmModal_.find('.modal-body');
  this.confirmModalCancel_ = this.confirmModal_.find('.cancel');
  this.confirmModalSubmit_ = this.confirmModal_.find('.submit');
  this.confirmModalCancel_.click(function(e) {
    e.preventDefault();
    if (!self.isDeleting_) {
      self.confirmModal_.modal(HIDE);
    }
  });
  this.confirmModalSubmit_.click(function(e) {
    e.preventDefault();
    if (!self.isDeleting_ && self.locale_) {
      self.confirmModalBody_.html('Deleting...');
      self.deleteLocale_(self.locale_.id);
    } else {
      self.confirmModal_.modal(HIDE);
    }
  });
};