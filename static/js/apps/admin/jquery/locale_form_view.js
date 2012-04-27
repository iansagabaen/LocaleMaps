$.namespace('localemaps.admin');

var CLOSE = 'close';
var ERROR = 'error';
var HIDDEN = 'hidden';

localemaps.admin.LocaleFormView = Backbone.View.extend({
  events: {
    'click .locale-form-error-alert .close': 'hideErrorAlert_',
    'click .locale-form-success-alert .close': 'hideSuccessAlert_'
  },
  initialize: function(options) {
    var self = this;
    this.errorAlert_ = this.$el.find('.locale-form-error-alert').alert();
    this.successAlert_ = this.$el.find('.locale-form-success-alert').alert();
    this.$el.submit(function(e) {
      self.submitForm_(e);
    });
  },
  disableForm_: function() {
    
  },
  displayFormError_: function(message) {
    if (!message) {
      message = 'There was an error in submitting your request.';
    }
    this.errorAlert_.find('.message').html(message);
  },
  enableForm_: function() {
    
  },
  handleSubmitSuccess_: function(response) {
    if (response.status === 'SUCCESS') {
      if (this.$el.hasClass('add-locale')) {
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
  submitForm_: function(e) {
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
        type: 'POST',
        url: this.$el.attr('action')
      });
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