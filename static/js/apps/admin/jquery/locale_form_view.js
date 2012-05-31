$.namespace('localemaps.admin');

var ERROR = 'error';
var HIDDEN = 'hidden';

localemaps.admin.LocaleFormView = localemaps.admin.BaseFormView.extend({
  events: {
    'click .locale-form-error-alert .close': 'hideErrorAlert_',
    'click .locale-form-success-alert .close': 'hideSuccessAlert_'
  },
  initialize: function(options) {
    this.actionUrl_ = options.actionUrl;
    this.countries_ = options.countries;
    this.message_ = options.message;
  },
  render: function() {
    var self = this;
    soy.renderElement(
      this.$el.get(0),
      localemaps.templates.localeForm,
      {
        action: this.actionUrl_,
        countries: this.countries_,
        locale: this.model ? this.model.toJSON() : null,
        message: this.message_
      });
    this.form_ = $('#locale-form');
    this.errorAlert_ = this.form_.find('.locale-form-error-alert').alert();
    this.successAlert_ = this.form_.find('.locale-form-success-alert').alert();
    this.form_.submit(function(e) {
      self.handleFormSubmit_(e);
    });
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
        url: this.actionUrl_
      });
    }
  },
  handleSubmitSuccess_: function(response) {
    var self = this;
    if (response && (response.status === 'SUCCESS')) {
      if (this.form_.hasClass('add-locale')) {
        var url = [
          '/locales/edit/',
          response.data.id,
          '?message=',
          encodeURIComponent(response.data.message)].join('');
        window.location.replace(url);
      } else {
        this.successAlert_.removeClass(HIDDEN);
        var alertMessage = this.successAlert_.find('.message'),
            self = this;
        alertMessage.html(response.data.message);
        self.trigger(localemaps.event.UPDATE_LOCALE_SUCCESS, response);
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
  },
  validate_: function() {
    var controlGroup,
        field,
        i,
        ok = true,
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
    return ok;
  }
});
