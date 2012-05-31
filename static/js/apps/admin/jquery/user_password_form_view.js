$.namespace('localemaps.admin');

var ERROR = 'error';
var HIDDEN = 'hidden';

localemaps.admin.UserPasswordFormView = localemaps.admin.BaseFormView.extend({
  events: {
    'click .user-password-form-error-alert .close': 'hideErrorAlert_',
    'click .user-password-form-success-alert .close': 'hideSuccessAlert_'
  },
  initialize: function(options) {
    this.isEditingSelf_ = options.isEditingSelf;
  },
  render: function() {
    var self = this;
    soy.renderElement(
      this.$el.get(0),
      localemaps.templates.userPasswordForm,
      {
        id: this.model.id
      });
    this.form_ = $('#user-password-form');
    this.form_.submit(function(e) {
      self.handleFormSubmit_(e);
    });
    this.errorAlert_ =
      this.form_.find('.user-password-form-error-alert').alert();
    this.successAlert_ =
      this.form_.find('.user-password-form-success-alert').alert();
  },
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
        url: this.form_.attr('action')
      });
    }
  },
  handleSubmitSuccess_: function(response) {
    var self = this;
    if (response && (response.status === 'SUCCESS')) {
      this.successAlert_.removeClass(HIDDEN);
      var alertMessage = this.successAlert_.find('.message'),
          self = this;
      alertMessage.html(response.data.message);
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
  },
  validate_: function() {
    var controlGroup,
        field,
        i,
        ok = true,
        password1 = $('#new-password'),
        password2 = $('#new-password2'),
        requiredFields = this.$el.find('input.required');
    for (i = 0; i < requiredFields.length; i++) {
      field = requiredFields[i];
      controlGroup = $(field).parents('.control-group')
      if (!$.trim(field.value).length) {
        controlGroup.addClass(ERROR);
        ok = false;
      } else {
        controlGroup.removeClass(ERROR);
      }
    }
    if ($.trim(password1.val()) !== $.trim(password2.val())) {
      this.displayFormError_('Please re-enter your new password twice.');
      ok = false;
    }
    return ok;
  }
});
