$.namespace('localemaps.admin');

var HIDDEN = 'hidden';

localemaps.admin.BaseFormView = Backbone.View.extend({
  displayFormError_: function(message) {
    if (!message) {
      message = 'There was an error in submitting your request.';
    } else {
      if ($.isArray(message)) {
        if (message.length > 1) {
          var messages = ['<p>There were error(s) in submitting your request:</p><ul>'];
          for (var i = 0; i < message.length; i++) {
            messages.push('<li>' + message[i] + '</li>');
          }
          messages.push('</ul>');
          message = messages.join('');
        } else {
          message = message[0];
        }
      }
    }
    this.errorAlert_.find('.message').html(message);
    this.errorAlert_.removeClass(HIDDEN);
  },
  hideErrorAlert_: function(e) {
    e.preventDefault();
    this.errorAlert_.addClass(HIDDEN);
  },
  hideSuccessAlert_: function(e) {
    e.preventDefault();
    this.successAlert_.addClass(HIDDEN);
  },
});