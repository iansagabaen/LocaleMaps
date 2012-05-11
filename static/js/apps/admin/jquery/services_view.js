/**
 * @fileoverview Defines a ServicesView Backbone view that wraps a table of
 *   worship services.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */
 
$.namespace('localemaps.admin');

/** @define {string} */
var DAY_OF_WEEK = 'day_of_week';
/** @define {string} */
var DATA_LM_ID = 'data-lm-id';
/** @define {string} */
var EDIT_MODE = 'edit-mode';
/** @define {string} */
var HIDE = 'hide';
/** @define {string} */
var HIDDEN = 'hidden';
/** @define {string} */
var LANGUAGE = 'language';
/** @define {string} */
var NEW_SERVICE = 'new-service';
/** @define {string} */
var OPTION_SELECTED = 'option:selected';
/** @define {string} */
var READ_ONLY = '.read-only';
/** @define {string} */
var SCHEDULE = 'schedule';
/** @define {string} */
var SHOW = 'show';
/** @define {Object} */
var SILENT_UPDATE = { silent: true };
/** @define {RegExp} */
var TIME_12_HR_EXPR = /(1[012]|[1-9]):[0-5][0-9](\\s)?(am|pm)/i;
/** @define {RegExp} */
var TIME_24_HR_EXPR = /([01]?[0-9]|2[0-3]):[0-5][0-9]/;
/** @define {string} */
var TR = 'tr';

/**
 * Wrapper around a table of worship serviceRowFragmentces.
 * @constructor
 * @extends {Backbone.View}
 */
localemaps.admin.ServicesView = Backbone.View.extend({
  events: {
    'change .day-of-week': 'handleDayOfWeekChange_',
    'change .language': 'handleLanguageChange_',
    'click .add': 'handleFormSubmit_',
    'click .cancel': 'handleCancelClick_',
    'click .cws': 'handleCwsClick_',
    'click .delete': 'handleDeleteClick_',
    'click .edit': 'handleEditClick_',
    'click .services-error-alert .close': 'hideErrorAlert_',
    'click .services-success-alert .close': 'hideSuccessAlert_',
    'click .update': 'handleFormSubmit_',
    'keyup .schedule': 'handleScheduleChange_'
  },
  addServiceRow: function(e) {
    var fragment = $(soy.renderAsFragment(
          localemaps.templates.serviceRowFragment,
          {
            daysOfWeek: this.daysOfWeek_,
            languages: this.languages_,
            service: false
          })),
        service = new localemaps.model.Service(),
        tr = fragment.find(TR),
        dayOfWeekSel = tr.find('.day-of-week-col .day-of-week');
    service.set(
      {
        cws: false,
        day_of_week: {
          description: dayOfWeekSel.find(OPTION_SELECTED).text(),
          value: dayOfWeekSel.val()
        }
      },
      SILENT_UPDATE);
    this.collection.add(service);
    tr.attr(DATA_LM_ID, service.cid);
    tr.addClass(EDIT_MODE);
    tr.addClass(NEW_SERVICE);
    this.$el.find('.services').append(tr);
  },
  initialize: function(options) {
    var self = this;
    this.daysOfWeek_ = options.daysOfWeek;
    this.languages_ = options.languages;
    this.localeId_ = options.localeId;
    this.initConfirmModal_();
  },
  render: function() {
    soy.renderElement(
      this.$el.get(0),
      localemaps.templates.services,
      {
        daysOfWeek: this.daysOfWeek_,
        languages: this.languages_,
        localeId: this.localeId_,
        services: this.collection.toJSON()
      });
    this.errorAlert_ = this.$el.find('.services-error-alert').alert();
    this.successAlert_ = this.$el.find('.services-success-alert').alert();
  },
  createFormData_: function(service) {
    var formData = [],
        localeId = this.$el.find('table.services').attr('data-lm-locale-id');
    formData.push('localeId=');
    formData.push(localeId);
    formData.push('&day_of_week=');
    formData.push(service.get('day_of_week').value);
    formData.push('&schedule=');
    formData.push(escape(service.get('schedule') || ''));
    if (service.get('cws')) {
      formData.push('&cws=');
      formData.push(service.get('cws'));
    }
    var language = service.get('language');
    if (language && language.code) {
      formData.push('&language=');
      formData.push(language.code);
    }
    return formData.join('');
  },
  deleteService_: function(metadata) {
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
      url: '/services/delete/' + metadata.service.get('id')
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
      service: this.collection.get(id) || this.collection.getByCid(id),
      tr: tr
    };
  },
  handleCancelClick_: function(e) {
    // Get out of edit mode.  If not yet an existing service, also remove
    // the service from the model collection also.
    e.preventDefault();
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target),
        service = metadata.service,
        tr = metadata.tr;
    if (service.isNew()) {
      this.collection.remove(service);
      tr.remove();
    } else {
      tr.removeClass(EDIT_MODE);
    }
  },
  handleCwsClick_: function(e) {
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target),
        modelData;
    modelData = {
      cws: target.is(':checked')
    };
    metadata.service.set(modelData, SILENT_UPDATE);
  },
  handleDayOfWeekChange_: function(e) {
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target),
        modelData;
    modelData = {
      day_of_week: {
        description: target.find(OPTION_SELECTED).text(),
        value: target.val()
      }
    };
    metadata.service.set(modelData, SILENT_UPDATE);
  },
  handleDeleteClick_: function(e) {
    e.preventDefault();
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target);
    this.metadataToDelete_ = metadata;
    this.errorAlert_.addClass(HIDDEN);
    this.successAlert_.addClass(HIDDEN);
    this.confirmModalHeader_.html('Are you sure?');
    this.confirmModalBody_.html(
      'Are you sure you want to remove this worship service?');
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
        service = metadata.service,
        inputs;
    this.errorAlert_.addClass(HIDDEN);
    this.successAlert_.addClass(HIDDEN);
    if (this.validateService_(service)) {
      // TODO(rcruz): Change to save via the Backbone collection
      var formData = this.createFormData_(service);
      $.ajax({
        data: formData,
        dataType: 'json',
        error: function(response) {
          self.displayErrorMessage_(response.data && response.data.message);
        },
        success: function(response) {
          if (response && response.status == 'SUCCESS') {
            self.handleSaveServiceSuccess_(response, metadata);
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
        url: service.isNew() ?
          '/services/create' :
          '/services/update/' + service.get('id')
      });
    }
  },
  handleLanguageChange_: function(e) {
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target),
        modelData;
    modelData = {
      language: {
        code: target.val(),
        description: target.find(OPTION_SELECTED).text()
      }
    };
    metadata.service.set(modelData, SILENT_UPDATE);
  },
  handleSaveServiceSuccess_: function(response, metadata) {
    var service = metadata.service,
        tr = metadata.tr,
        dayOfWeekNode = tr.find('.day-of-week-col ' + READ_ONLY),
        scheduleNode = tr.find('.schedule-col ' + READ_ONLY),
        languageNode = tr.find('.language-col ' + READ_ONLY),
        cwsNode = tr.find('.cws-col ' + READ_ONLY),
        id = response.data.id;
    dayOfWeekNode.html(service.get(DAY_OF_WEEK).description);
    scheduleNode.html(service.get(SCHEDULE));
    if (service.get(LANGUAGE)) {
      languageNode.html(service.get(LANGUAGE).description);
    }
    if (service.get('cws')) {
      cwsNode.removeClass(HIDDEN);
    } else {
      cwsNode.addClass(HIDDEN);
    }
    tr.removeClass(EDIT_MODE);
    if (service.isNew()) {
      service.set({ id: id });
      tr.attr(DATA_LM_ID, id);
      tr.removeClass(NEW_SERVICE);
    }
  },
  handleScheduleChange_: function(e) {
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target),
        modelData;
    modelData = {
      schedule: target.val()
    };
    metadata.service.set(modelData, SILENT_UPDATE);
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
      self.confirmModal_.modal(HIDE);
    });
    this.confirmModalSubmit_.click(function(e) {
      e.preventDefault();
      self.confirmModalBody_.html('Deleting...');
      self.deleteService_(self.metadataToDelete_);
    });
  },
  validateService_: function(service) {
    return true;
    var schedule = service.get('schedule');
    if (TIME_12_HR_EXPR.test(schedule) || TIME_24_HR_EXPR.test(schedule)) {
      return true;
    } else {
      var message = (schedule && schedule.length) ? 
        schedule + ' is not a valid schedule.' :
        'You need to enter a schedule.';
      this.displayErrorMessage_(message);
      return false;
    }
  }
});
