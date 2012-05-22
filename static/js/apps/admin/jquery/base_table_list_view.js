/**
 * @fileoverview Defines a ServicesView Backbone view that wraps a table of
 *   worship services.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */
 
$.namespace('localemaps.admin');

/** @define {string} */
var DATA_LM_ID = 'data-lm-id';
/** @define {string} */
var EDIT_MODE = 'edit-mode';
/** @define {string} */
var HIDE = 'hide';
/** @define {string} */
var HIDDEN = 'hidden';
/** @define {string} */
var NEW = 'new';
/** @define {string} */
var READ_ONLY = '.read-only';
/** @define {string} */
var SHOW = 'show';
/** @define {Object} */
var SILENT_UPDATE = { silent: true };
/** @define {string} */
var TR = 'tr';

/**
 * Wrapper around a table of worship serviceRowFragmentces.
 * @constructor
 * @extends {Backbone.View}
 */
localemaps.admin.BaseTableListView = localemaps.admin.BaseFormView.extend({
  initialize: function(options) {
    throw 'Need to implement initialize()';
  },
  render: function() {
    throw 'Need to implement render()';
  },
  createFormData_: function(service) {
    throw 'Need to implement createFormData_()';
  },
  delete_: function(metadata) {
    var self = this;
    $.ajax({
      dataType: 'json',
      error: function(response) {
        self.displayErrorMessage_(response.data && response.data.message);
      },
      success: function(response) {
        self.displaySuccessMessage_(response.data.message);
        self.confirmModal_.modal(HIDE);
        metadata.tr.remove();
      },
      type: 'DELETE',
      url: this.urls_.deleteUrl + metadata.model.get('id')
    });
  },
  displayErrorMessage_: function(message) {
    if (!message) {
      message = 'There was an error in submitting your request.';
    } else {
      if ($.isArray(message)) {
        var messages = ['<p>There were error(s) in submitting your request:</p><ul>'];
        for (var i = 0; i < message.length; i++) {
          messages.push('<li>' + message[i] + '</li>');
        }
        messages.push('</ul>');
        message = messages.join('');
      }
    }
    var alertMessage = this.errorAlert_.find('.message');
    this.errorAlert_.removeClass(HIDDEN);
    alertMessage.html(message);
  },
  displaySuccessMessage_: function(message) {
    var alertMessage = this.successAlert_.find('.message');
    this.successAlert_.removeClass(HIDDEN);
    alertMessage.html(message);
  },
  getAncestorTr_: function(element) {
    var tr = element.parent();
    while (tr.get(0).nodeName.toLowerCase() != TR) {
      tr = tr.parent();
    }
    return tr;
  },
  getMetadataForRow_: function(elt) {
    var tr = this.getAncestorTr_(elt),
        id = tr.attr(DATA_LM_ID);
    return {
      model: this.collection.get(id) || this.collection.getByCid(id),
      tr: tr
    };
  },
  handleCancelClick_: function(e) {
    // If the model is new, remove the 'tr' and the model.  Otherwise,
    // just get out of edit mode.
    e.preventDefault();
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target),
        model = metadata.model,
        tr = metadata.tr;
    if (model.isNew()) {
      this.collection.remove(model);
      tr.remove();
    } else {
      tr.removeClass(EDIT_MODE);  
    }
  },
  handleDeleteClick_: function(e) {
    e.preventDefault();
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target);
    this.metadataToDelete_ = metadata;
    this.errorAlert_.addClass(HIDDEN);
    this.successAlert_.addClass(HIDDEN);
    this.confirmModalHeader_.html('Are you sure?');
    this.confirmModalBody_.html(this.deleteConfirmBody_);
    this.confirmModal_.modal(SHOW);
  },
  handleEditClick_: function(e) {
    e.preventDefault();
    var target = $(e.target),
        tr = this.getAncestorTr_(target);
    tr.addClass(EDIT_MODE);
  },
  handleFormSubmit_: function(e) {
    e.preventDefault();
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target),
        self = this,
        model = metadata.model,
        inputs;
    this.errorAlert_.addClass(HIDDEN);
    this.successAlert_.addClass(HIDDEN);
    if (this.validate_(model)) {
      var formData = this.createFormData_(model);
      $.ajax({
        data: formData,
        dataType: 'json',
        error: function(response) {
          self.displayErrorMessage_(response.data && response.data.message);
        },
        success: function(response) {
          if (response && response.status == 'SUCCESS') {
            self.handleSaveSuccess_(response, metadata);
            self.displaySuccessMessage_(response.data.message);
          } else {
            if (response && response.data && response.data.errors) {
              var errors = response.data.errors,
                  errorMessages = [];
              for (var key in errors) {
                errorMessages.push(errors[key][0]);
              }
              self.displayErrorMessage_(errorMessages);
              return;
            } else {
              self.displayErrorMessage_();
            }
          }
        },
        type: 'POST',
        url: model.isNew() ?
          self.urls_.createUrl :
          self.urls_.updateUrl + model.get('id')
      });
    }
  },
  handleSaveSuccess_: function(response, metadata) {
    var model = metadata.model,
        tr = metadata.tr,
        id = response.data.id;
    tr.removeClass(EDIT_MODE);
    this.updateReadOnlyMode_(tr, model);
    if (model.isNew()) {
      model.set({ id: id });
      tr.attr(DATA_LM_ID, id);
      tr.removeClass(NEW);
    }
  },
  hideErrorAlert_: function(e) {
    e.preventDefault();
    this.errorAlert_.addClass(HIDDEN);
  },
  hideSuccessAlert_: function(e) {
    e.preventDefault();
    this.successAlert_.addClass(HIDDEN);
  },
  initConfirmModal_: function() {
    var self = this;
    this.confirmModal_ = this.$el.find('.confirmation-modal').modal({
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
      self.confirmModal_.modal(HIDE);
    });
    this.confirmModalSubmit_.click(function(e) {
      e.preventDefault();
      self.confirmModalBody_.html('Deleting...');
      self.delete_(self.metadataToDelete_);
    });
  },
  updateReadOnlyMode_: function(tr, model) {
    throw 'Need to implement updateReadOnlyMode_()';
  },
  validate_: function(service) {
    throw 'Need to implement validate_()';
  }
});

localemaps.admin.BaseTableListView.EVENTS = {
  'click .add': 'handleFormSubmit_',
  'click .cancel': 'handleCancelClick_',
  'click .delete': 'handleDeleteClick_',
  'click .edit': 'handleEditClick_',
  'click .error-alert .close': 'hideErrorAlert_',
  'click .success-alert .close': 'hideSuccessAlert_',
  'click .update': 'handleFormSubmit_'
};