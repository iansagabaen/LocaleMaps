/**
 * @fileoverview Defines an GlobalNavDistrictFormView class, a Backbone view
 *   that wraps around form for editing global nav items for a
 *   district/region, or locale on localemaps.com
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.admin');

/** @define {string} */
var HIDDEN = 'hidden';

/**
 * Constructs a GlobalNavDistrictFormView class, a Backbone view
 *   that wraps around a form for editing global nav items for a
 *   district/region on localemaps.com.
 * @extends {localemaps.admin.BaseFormView}
 * @constructor
 */
localemaps.admin.GlobalNavBaseFormView = localemaps.admin.BaseFormView.extend({
  events: localemaps.admin.BaseFormView.EVENTS,
  /**
   * Renders the view using the model data.  See http://backbonejs.org/#View-render
   */
  render: function() {
    var self = this;
    if (this.templateData_) {
      soy.renderElement(this.$el.get(0), this.template_, this.templateData_);
    } else {
      soy.renderElement(this.$el.get(0), this.template_);
    }
    this.form_ = this.$el.find('form');
    this.form_.submit(function(e) {
      self.handleFormSubmit_(e);
    });
    this.errorAlert_ = this.form_.find('.alert-error').alert();
    this.successAlert_ = this.form_.find('.alert-success').alert();
  },
  /**
   * Displays or hides the element wrapped by the view.
   * @param {boolean|localemaps.model.NavItem} Set to false to hide the view, or
   *    pass in a NavItem instance to display the view, and set the form
   *    elements.
   */
  setVisible: function(navItem) {
    throw 'Need to implement setVisible()';
  },
  /**
   * Handles 'submit' event on the 'form' element in the view.
   * @param {Object} e Event object
   * @protected
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
        url: this.form_.attr('action')
      });
    }
  },
  /**
   * Handles a successful form submission for the 'form' element wrapped
   * by the view.
   * @param {Object} response The server response
   * @protected
   */
  handleSubmitSuccess_: function(response) {
    var self = this;
    if (response && (response.status === 'SUCCESS')) {
      var alertMessage = this.successAlert_.find('.message'),
          data = response.data;
      this.successAlert_.removeClass(HIDDEN);
      alertMessage.html(data.message);
      this.trigger(localemaps.event.NAV_UPDATE_SUCCESS, data);
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