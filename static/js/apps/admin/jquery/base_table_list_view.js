/**
 * @fileoverview Defines a BaseTableListView Backbone view that wraps a table of
 *   objects.
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
 * Wrapper around a table of objects.
 * @constructor
 * @extends {localemaps.admin.BaseFormView}
 */
localemaps.admin.BaseTableListView = localemaps.admin.BaseFormView.extend({
  /**
   * Initializes the view.  See http://backbonejs.org/#View-constructor
   * @param {Object} options Options that are saved as this.options in the view.
   */
  initialize: function(options) {
    throw 'Need to implement initialize()';
  },
  /**
   * Renders the view.  See http://backbonejs.org/#View-render
   */
  render: function() {
    throw 'Need to implement render()';
  },
  /**
   * Creates a querystring useful for form submission out of a given
   * Backbone model.
   * @param {Backbone.Model} model The model to inspect.
   * @protected
   */
  createFormData_: function(model) {
    throw 'Need to implement createFormData_()';
  },
  /**
   * Deletes a model and table row specified by the given metadata.
   * @param {Object} metadata An object with the following properties:
   *   <ul>
   *     <li>{Element} tr Table row for the model to delete</li>
   *     <li>{Backbone.Model} model The model to delete</li>
   *   </ul>
   * @protected
   */
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
        // TODO(rcruz): Delete the model from the collection.
      },
      type: 'DELETE',
      url: this.urls_.deleteUrl + metadata.model.get('id')
    });
  },
  /**
   * Displays an error message via a Bootstrap error alert.
   * @param {Array.<string>|string} message Single or multiple error messages
   *   to display.  If a list of messages is passed, the messages will be 
   *   displayed as an unordered list.
   * @protected
   */
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
  /**
   * Displays a success message via a Bootstrap success alert.
   * @param {Array.<string>|string} message Single or multiple error messages
   *   to display.  If a list of messages is passed, the messages will be 
   *   displayed as an unordered list.
   * @protected
   */
  displaySuccessMessage_: function(message) {
    var alertMessage = this.successAlert_.find('.message');
    this.successAlert_.removeClass(HIDDEN);
    alertMessage.html(message);
  },
  /**
   * Returns a 'tr' ancestor element for the given 
   * @param {Element} elt DOM node that should be a child of a 'tr'.
   * @protected
   */
  getAncestorTr_: function(elt) {
    return $(elt).parents(TR);
  },
  /**
   * For a given node, gets the associated 'tr', and returns an object with:
   *    tr and model properties.
   * @param {Element} elt DOM element to inspect.
   * @return {Object} An object with the following properties:
   *    <ul>
   *      <li>model {Backbone.Model}</li>
   *      <li>tr {Element}</li>
   *    </ul>
   * @protected
   */
  getMetadataForRow_: function(elt) {
    var tr = this.getAncestorTr_(elt),
        id = tr.attr(DATA_LM_ID);
    return {
      model: this.collection.get(id) || this.collection.getByCid(id),
      tr: tr
    };
  },
  /**
   * Handles clicks on the 'Cancel' button for an individual row.
   * @param {Object} e Event object
   * @protected
   */
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
  /**
   * Handles clicks on the 'Delete' button for an individual row.
   * @param {Object} e Event object
   * @protected
   */
  handleDeleteClick_: function(e) {
    // Hide alerts, and display the confirm modal.
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
  /**
   * Handles clicks on the 'Edit' button for an individual row.
   * @param {Object} e Event object
   * @protected
   */
  handleEditClick_: function(e) {
    if (this.inlineEdit_ !== false) {
      e.preventDefault();
      var target = $(e.target),
          tr = this.getAncestorTr_(target);
      tr.addClass(EDIT_MODE);
    }
  },
  /**
   * Handles form submission for an individual row.
   * @param {Object} e Event object
   * @protected
   */
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
  /**
   * Handles saving a model successfully.
   * @param {Object} response Server response.
   * @param {Object} metadata An object with the following properties:
   *    <ul>
   *      <li>model {Backbone.Model}</li>
   *      <li>tr {Element}</li>
   *    </ul>
   * @protected
   */
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
  /**
   * Initializes the Confirm modal for a given view.
   * @protected.
   */
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
  /**
   * For a given row, updates the read-only DOM elements, based on given model.
   * @param {Element} tr The 'tr' whose DOM elements should be updated.
   * @param {Backbone.Model} The model which the update will be based on.
   */
  updateReadOnlyMode_: function(tr, model) {
    throw 'Need to implement updateReadOnlyMode_()';
  },
  /**
   * This method is called before an async call is done to save a model.
   * @param {Backbone.Model} model
   * @return {boolean} true if the model's data is valid, and false otherwise.
   * @protected
   */
  validate_: function(model) {
    throw 'Need to implement validate_()';
  }
});

/**
 * An object containing various default events that a BaseTableListView
 * will support.
 * @static
 */
localemaps.admin.BaseTableListView.EVENTS = {
  'click .add': 'handleFormSubmit_',
  'click .cancel': 'handleCancelClick_',
  'click .delete': 'handleDeleteClick_',
  'click .edit': 'handleEditClick_',
  'click .alert-error .close': 'hideErrorAlert_',
  'click .alert-success .close': 'hideSuccessAlert_',
  'click .update': 'handleFormSubmit_'
};