/**
 * @fileoverview Defines an UserFormView class that is the base for
 *   submitting user information on the localemaps.com admin site.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.admin');

/** @define {string} */
var HIDDEN = 'hidden';

/**
 * Constructs a LocaleFormView instance that is the base for
 *   submitting user information on the localemaps.com admin site.
 * @extends {localemaps.admin.BaseFormView}
 * @constructor
 */
localemaps.admin.UserFormView = localemaps.admin.BaseFormView.extend({
  events: {
    'click .user-form-error-alert .close': 'hideErrorAlert_',
    'click .user-form-success-alert .close': 'hideSuccessAlert_'
  },
  /**
   * Initializes the view.  See http://backbonejs.org/#View-constructor
   * @param {Object} options This can be referred to via this.options from
   *   within the view.
   */
  initialize: function(options) {
    this.actionUrl_ = options.actionUrl;
    this.isEditingSelf_ = options.isEditingSelf;
    this.message_ = options.message;
  },
  /**
   * Renders the view using the model data.  See http://backbonejs.org/#View-render
   */
  render: function() {
    var self = this;
    soy.renderElement(
      this.$el.get(0),
      localemaps.templates.userForm,
      {
        action: this.actionUrl_,
        isEditingSelf: this.isEditingSelf_,
        message: this.message_,
        user: this.model ? this.model.toJSON() : null
      });
    this.form_ = $('#user-form');
    this.form_.submit(function(e) {
      self.handleFormSubmit_(e);
    });
    this.errorAlert_ = this.form_.find('.user-form-error-alert').alert();
    this.successAlert_ = this.form_.find('.user-form-success-alert').alert();
  },
  /**
   * Handles the submit event of the form.
   * @param {Object} e Event object
   * @private
   */
  handleFormSubmit_: function(e) {
    var inputs,
        self = this;
    e.preventDefault();
    this.errorAlert_.addClass(HIDDEN);
    this.successAlert_.addClass(HIDDEN);
    if (this.validate_()) {
      inputs = [];
      $(':input', this.$el).each(function() {
        inputs.push(this.name + '=' + escape(this.value));
      });
      $.ajax({
        data: inputs.join('&'),
        dataType: 'json',
        error: function(response) {
          self.displayFormError_();
        },
        success: function(response) {
          self.handleSubmitSuccess_(response);
        },
        type: this.form_.attr('method'),
        url: this.actionUrl_
      });
    }
  },
  /**
   * Handles server response after successfully executing async call to update
   * a user.
   * @param {Object} response Server response.
   * @private
   */
  handleSubmitSuccess_: function(response) {
    var self = this;
    if (response && (response.status === 'SUCCESS')) {
      if (this.form_.hasClass('add-user')) {
        var url = [
          '/users/edit/',
          response.data.id,
          '?message=',
          encodeURIComponent(response.data.message)].join('');
        window.location.replace(url);
      } else {
        this.successAlert_.removeClass(HIDDEN);
        var alertMessage = this.successAlert_.find('.message'),
            self = this;
        alertMessage.html(response.data.message);
      }
    } else {
      if (response && response.data && response.data.errors) {
        var errors = response.data.errors,
            errorMessages = [];
        for (var key in errors) {
          errorMessages.push(errors[key][0]);
        }
        self.displayFormError_(errorMessages);
        return;
      }
      self.displayFormError_();
    }
  }
});
