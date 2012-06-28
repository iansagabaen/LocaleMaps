/**
 * @fileoverview Defines an BaseFormView class that is the base for
 *   form submission on the localemaps.com admin site.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.admin');

/** @define {string} */
var ERROR = 'error';
/** @define {string} */
var HIDDEN = 'hidden';

/**
 * Constructs a BaseFormView instance, which wraps around a Bootstrap
 * error alert and success alert.  Do not instantiate this class directly,
 * but rather subclass it.  The subclass should define errorAlert_ and
 * successAlert_ properties which are Bootstrap alerts.
 * @extends {Backbone.View}
 * @constructor
 */
localemaps.admin.BaseFormView = Backbone.View.extend({
  /**
   * Displays error messages as a Bootstrap error alert.
   * @param {Array.<string>|string} message Error message(s) to display
   * @protected
   */
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
  /**
   * Hides the error alert associated with the view
   * @param {Object} e Event object
   * @protected
   */
  hideErrorAlert_: function(e) {
    e.preventDefault();
    this.errorAlert_.addClass(HIDDEN);
  },
  /**
   * Hides the success alert associated with the view
   * @param {Object} e Event object
   * @protected
   */
  hideSuccessAlert_: function(e) {
    e.preventDefault();
    this.successAlert_.addClass(HIDDEN);
  },
  /**
   * Indicates if the form data is valid or not.
   * @return {boolean} Return true if the form is valid, and false otherwise.
   * @protected
   */
  validate_: function() {
    // Check all input.required fields.  If any are empty, then display their
    // corresponding error message(s).
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

/**
 * An object containing various default events that a BaseFormView
 * will support.
 * @static
 */
localemaps.admin.BaseFormView.EVENTS = {
  'click .alert-error .close': 'hideErrorAlert_',
  'click .alert-success .close': 'hideSuccessAlert_'
};