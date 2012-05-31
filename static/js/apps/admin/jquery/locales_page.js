/**
 * @fileoverview Defines a LocalesPage class that manages displaying
 *   the list of all locales shown on localemaps.com
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.admin');

/** @define {string} */
var DELETE = 'delete';
/** @define {string} */
var HIDE = 'hide';
/** @define {string} */
var SHOW = 'show';

/**
 * Constructs a LocalesPage instance that manages displaying
 *   the list of all locales shown on localemaps.com
 * @param {Array.<Object>} locales List of locales.  See
 *   /web/admin/Controller/LocaleController.php - index()
 * @constructor
 */
localemaps.admin.LocalesPage = function(locales) {
  var self = this,
      locale;
  this.isDeleting_ = false;
  this.locales_ = new localemaps.model.Locales();
  if (locales && locales.length) {
    for (i = 0; i < locales.length; i++) {
      locale = locales[i];
      locale['Locale']['country'] = locale['Country'];
      this.locales_.add(locale['Locale']);
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

/**
 * Fires async request to delete a locale.
 * @param {number|string} id ID of the locale to delete.
 * @private
 */
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

/**
 * Handles response when successfully deleting a locale.
 * @private
 */
localemaps.admin.LocalesPage.prototype.handleDeleteLocaleSuccess_ =
  function() {
  // Display the confirm modal saying the locale is now removed, and
  // remove the associated 'tr'.
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

/**
 * Handles a click on the locales table.
 * @param {Object} e Event object
 * @private
 */
localemaps.admin.LocalesPage.prototype.handleLocalesClick_ = function(e) {
  var message,
      target = $(e.target),
      tr;
  // If clicking on the 'Delete' icon, show the Confirm modal and ask if the
  // user really wants to delete the locale.
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

/**
 * Initializes the Confirm modal.
 * @private
 */
localemaps.admin.LocalesPage.prototype.initConfirmModal_ = function() {
  // Initialize modal, and event handling for the Submit and Cancel buttons.
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